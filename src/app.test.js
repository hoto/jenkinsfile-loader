const app = require('../src/app.js')
let watcher = require('../src/watcher.js')
const config = require('../src/config.js')

jest.mock('./watcher.js')
jest.mock('../src/config.js')

const DIRECTORY = 'DIRECTORY'

describe('app should', () => {

  it('start watching jenkinsfiles directory', () => {
    config.jenkinsfilesDir = DIRECTORY
    watcher.watch = jest.fn(() => ({
      on: jest.fn().mockReturnThis()
    }))

    app.startWatching()

    expect(watcher.watch).toBeCalledWith({dir: DIRECTORY})
  })

})
