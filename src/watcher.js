const chokidar = require('chokidar')

const chokidarOptions = {
  ignored: /(^|[\/\\])\../,
  persistent: true
}

const watch = ({dir}) => {
  const originalWatcher = chokidar.watch(dir, chokidarOptions)
  return chokidarWrapper({originalWatcher})
}

const chokidarWrapper = ({originalWatcher}) => (
  {
    on: (eventName, handlerFn) => originalWatcher.on(eventName, handlerFn)
  }
)

module.exports = {
  watch
}
