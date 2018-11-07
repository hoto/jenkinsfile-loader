const app = require('../src/app.js')
let watcher = require('../src/watcher.js')
const config = require('../src/config.js')
const jenkins = require('../src/jenkins.js')

jest.mock('../src/watcher.js')
jest.mock('../src/config.js')

const JENKINSFILES_DIR = 'JENKINSFILES_DIR'
const CONFIGS_XML_DIR = 'CONFIGS_XML_DIR'

describe('app should', () => {

  beforeEach(() => {
    config.jenkinsfilesDir = JENKINSFILES_DIR
    config.configsXmlDir = CONFIGS_XML_DIR
  })

  it('start watching configs xml directory', () => {
    watcher.watch = jest.fn(() => ({
      on: jest.fn().mockReturnThis()
    }))

    app.startWatching()

    expect(watcher.watch).toBeCalledWith({dir: CONFIGS_XML_DIR})
  })

  it('create, update and delete jenkins job when config xml change state', () => {
    const on = jest.fn().mockReturnThis()
    watcher.watch = jest.fn(() => ({on}))

    app.startWatching()

    expect(on).toBeCalledWith('add', jenkins.createJobFromConfig)
    expect(on).toBeCalledWith('change', jenkins.updateJobFromConfig)
    expect(on).toBeCalledWith('unlink', jenkins.deleteJob)
    expect(on).toHaveBeenCalledTimes(6)
  })

  it('start watching jenkinsfiles directory', () => {
    watcher.watch = jest.fn(() => ({
      on: jest.fn().mockReturnThis()
    }))

    app.startWatching()

    expect(watcher.watch).toBeCalledWith({dir: JENKINSFILES_DIR})
  })

  it('create, update and delete jenkins job when jenkinsfile change state', () => {
    const on = jest.fn().mockReturnThis()
    watcher.watch = jest.fn(() => ({on}))

    app.startWatching()

    expect(on).toBeCalledWith('add', jenkins.createJobFromJenkinsfile)
    expect(on).toBeCalledWith('change', jenkins.updateJobFromJenkinsfile)
    expect(on).toBeCalledWith('unlink', jenkins.deleteJob)
    expect(on).toHaveBeenCalledTimes(6)
  })

})
