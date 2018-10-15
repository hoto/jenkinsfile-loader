const chokidar = require('chokidar')

const chokidarOptions = {
  ignored: /(^|[\/\\])\../,
  persistent: true
}

const watch = ({dir}) => {
  const originalWatcher = chokidar.watch(dir, chokidarOptions)
  const wrapper = {
    on: (eventName, handlerFn) => {
      originalWatcher.on(eventName, filePath => curry(handlerFn)(filePath))
      return wrapper
    }
  }
  return wrapper
}

const curry = (handlerFn) => {
  const internal = (filePath) => {
    console.log('got: ', filePath)
    const filenameWithExt = getFilenameWithExtension(filePath)
    const filenameWithoutExt = getFilenameWithoutExtension(filePath)
    return handlerFn({filePath, filenameWithExt, filenameWithoutExt})
  }
  return internal
}

const getFilenameWithExtension = (path) => path.split('/').pop()

const getFilenameWithoutExtension = (path) => getFilenameWithExtension(path).split('.')[0]

module.exports = {
  watch
}
