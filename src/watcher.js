const chokidar = require('chokidar')

const chokidarOptions = {
  ignored: /(^|[\/\\])\../,
  persistent: true
}

const watch = ({dir}) => {
  const originalWatcher = chokidar.watch(dir, chokidarOptions)
  const wrapper = {
    on: (eventName, handlerFn) => {
      originalWatcher.on(eventName, filePath => breakdownFilePath(handlerFn)(filePath))
      return wrapper
    }
  }
  return wrapper
}

const breakdownFilePath = (handlerFn) => (filePath) => {
  const filenameWithExt = getFilenameWithExtension(filePath)
  const filenameWithoutExt = getFilenameWithoutExtension(filePath)
  return handlerFn({filePath, filenameWithExt, filenameWithoutExt})
}


const getFilenameWithExtension = (path) => path.split('/').pop()

const getFilenameWithoutExtension = (path) => getFilenameWithExtension(path).split('.')[0]

module.exports = {
  watch
}
