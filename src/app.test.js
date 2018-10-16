const app = require('../src/app.js')
let watcher = require('../src/watcher.js')
const config = require('../src/config.js')
const jenkins = require('../src/jenkins.js')

jest.mock('./watcher.js')
jest.mock('../src/config.js')

const JENKINSFILES_DIR = 'JENKINSFILES_DIR'

describe('app should', () => {

  it('start watching jenkinsfiles directory', () => {
    config.jenkinsfilesDir = JENKINSFILES_DIR
    watcher.watch = jest.fn(() => ({
      on: jest.fn().mockReturnThis()
    }))

    app.startWatching()

    expect(watcher.watch).toBeCalledWith({dir: JENKINSFILES_DIR})
  })

  it('create, update and delete jenkins job when jenkinsfile change state', () => {
    config.jenkinsfilesDir = JENKINSFILES_DIR
    const onMock = jest.fn().mockReturnThis()
    watcher.watch = jest.fn(() => ({
      on: onMock
    }))

    app.startWatching()

    expect(onMock).toBeCalledWith('add', jenkins.createJob)
    expect(onMock).toBeCalledWith('change', jenkins.updateJob)
    expect(onMock).toBeCalledWith('unlink', jenkins.deleteJob)
    expect(onMock).toHaveBeenCalledTimes(3)
  })

})
