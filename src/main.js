const app = require('./app.js')
const waitOn = require('wait-on')
const config = require('./config.js')
const log = require('./log.js')

const jenkinsUrl = `${config.jenkinsUrl}/api/json`
const waitOnOptions = {
  resources: [jenkinsUrl],
  interval: 1000,
  followAllRedirects: true,
  followRedirect: true,
  window: 1000
}

const main = () => {
  log.info(`Waiting for Jenkins at ${jenkinsUrl}...`)

  waitOn(waitOnOptions)
    .then(() => {
      log.info('Connection to Jenkins established...')
      return app.startWatching()
    })
    .catch(log.error)
}

const runAppForever = () => process.stdin.resume()

main()
runAppForever()
