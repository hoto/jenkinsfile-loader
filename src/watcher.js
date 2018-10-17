const chokidar = require('chokidar')
const fs = require('fs-promise')
const log = require('./log.js')

const chokidarOptions = {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  interval: 2000,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  }
}

const watch = ({dir}) => {
  const originalWatch = chokidar.watch(dir, chokidarOptions)
  const wrapper = {
    on: (eventName, handler) => {
      originalWatch.on(eventName, filePath => {
        logEvent(eventName, filePath)
        breakdownFilePath(handler)(filePath)
      })
      return wrapper
    }
  }
  return wrapper
}

const logEvent = (eventName, filePath) => log.debug(`Watch event: ${eventName}, file: ${filePath}`)

const breakdownFilePath = (handler) => (filePath) => {
  const file = getFilePromise(filePath)
  const filenameWithoutExt = getFilenameWithoutExtension(filePath)
  return handler({file, filenameWithoutExt})
}

const getFilePromise = (filePath) =>
  fs
    .readFile(filePath)
    .then(file => file.toString())
    .catch(err => Promise.resolve)


const getFilenameWithoutExtension = (path) => getFilenameWithExtension(path).split('.')[0]
const getFilenameWithExtension = (path) => path.split('/').pop()

module.exports = {
  watch
}
