const fs = require('fs-promise')
const jenkins = require('./jenkins.js')
const log = require('./log.js')
const jenkinsfile = require('./jenkinsfile.js')

const jenkinsfilePath = process.cwd() + '/test/resources/pipeline.original'
const name = 'job-a'

fs
  .readFile(jenkinsfilePath)
  .then(file => file.toString())
  .then(content => jenkinsfile.toJobConfig({jenkinsfile: content}))
  .then(config => jenkins.checkIfJobExists({name})
    .then(jobExists =>
      jobExists ?
        jenkins.updateJob({name, config}) :
        jenkins.createJob({name, config})
    )
  )
  .catch(log.error)

