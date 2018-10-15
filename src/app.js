const config = require('./config.js')
const watcher = require('./watcher.js')
const jenkins = require('./jenkins.js')

const startWatching = () =>
  watcher
    .watch({dir: config.jenkinsfilesDir})
    .on('add', jenkins.createJob)
    .on('change', jenkins.updateJob)
    .on('unlink', jenkins.deleteJob)

const runAppForever = () => process.stdin.resume()

startWatching()
runAppForever()
