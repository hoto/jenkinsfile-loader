const chokidar = require('chokidar')

const watch = ({dir}) => chokidar.watch(dir, {
  ignored: /(^|[\/\\])\../,
  persistent: true
})

module.exports = {
  watch
}
