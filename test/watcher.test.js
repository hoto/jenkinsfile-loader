const watcher = require('../src/watcher.js')
const chokidar = require('chokidar')
const fs = require('fs-promise')
const log = require('../src/log.js')

jest.mock('chokidar')
jest.mock('fs-promise')
jest.mock('../src/log.js')

const DIRECTORY = 'DIRECTORY'
const FILE_CONTENT = 'FILE_CONTENT'
const EVENT_NAME = 'EVENT_NAME'
const FILE_NAME = 'FILE_NAME'

describe('watcher should', () => {

  it('call handler with file promise and file name', async () => {
    const filePromise = Promise.resolve(FILE_CONTENT)
    fs.readFile = jest.fn(() => filePromise)
    const onMock = jest.fn((eventName, handler) => handler(`PATH/${FILE_NAME}.groovy`))
    const watchMock = {on: onMock}
    chokidar.watch = jest.fn(() => watchMock)
    const eventHandler = jest.fn()
    const watch = watcher.watch({dir: DIRECTORY})
    watch.on(EVENT_NAME, eventHandler)

    await watchMock.on(EVENT_NAME, (filePath) => filePath)

    expect(eventHandler)
      .toHaveBeenCalledWith({file: filePromise, filenameWithoutExt: FILE_NAME})
  })

  it('read file from disk', async () => {
    expect.assertions(1)
    const filePromise = Promise.resolve(FILE_CONTENT)
    fs.readFile = jest.fn(() => filePromise)
    const onMock = jest.fn((eventName, handler) => handler(`PATH/${FILE_NAME}.groovy`))
    const watchMock = {on: onMock}
    chokidar.watch = jest.fn(() => watchMock)
    let receivedFile
    const eventHandler = ({file}) => receivedFile = file
    const watch = watcher.watch({dir: DIRECTORY})
    watch.on(EVENT_NAME, eventHandler)

    await watchMock.on(EVENT_NAME, (filePath) => filePath)

    await receivedFile.then((content) => expect(content).toBe(FILE_CONTENT))
  })

  it('log event and file path', async () => {
    const filePromise = Promise.resolve(FILE_CONTENT)
    fs.readFile = jest.fn(() => filePromise)
    const onMock = jest.fn((eventName, handler) => handler(`PATH/${FILE_NAME}.groovy`))
    const watchMock = {on: onMock}
    chokidar.watch = jest.fn(() => watchMock)
    const eventHandler = jest.fn()
    const watch = watcher.watch({dir: DIRECTORY})
    watch.on(EVENT_NAME, eventHandler)

    await watchMock.on(EVENT_NAME, (filePath) => filePath)

    expect(log.debug)
      .toHaveBeenCalledWith(`Watch event: EVENT_NAME, file: PATH/FILE_NAME.groovy`)
  })

})
