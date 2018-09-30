const fs = require('fs-promise')
const jenkins = require('./jenkins.js')
const log = require('./logger.js')

const configFile = process.cwd() + '/test/resources/config.xml'
const name = 'my-new-job';

fs
  .readFile(configFile)
  .then(configFile => configFile.toString())
  .then(config =>
    jenkins.checkIfJobExists({name})
      .then(jobExists => {
        jobExists ?
          jenkins.updateJob({name, config}) :
          jenkins.createJob({name, config})
      })
  )
  .catch(log.error)

