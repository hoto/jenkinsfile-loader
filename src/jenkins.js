const fs = require('fs-promise')
const log = require('./log.js')
const jenkinsApi = require('./jenkinsApi.js')
const jenkinsfile = require('./jenkinsfile.js')

const createJob = ({filePath, filenameWithExt, filenameWithoutExt}) => {
  log.debug(`File ${filenameWithExt} added...`)
  createOrUpdateJob({jenkinsfilePath: filePath, jobName: filenameWithoutExt})
}

const updateJob = ({filePath, filenameWithExt, filenameWithoutExt}) => {
  log.debug(`File ${filenameWithExt} updated...`)
  createOrUpdateJob({jenkinsfilePath: filePath, jobName: filenameWithoutExt})
}

const createOrUpdateJob = ({jenkinsfilePath, jobName}) => {
  fs
    .readFile(jenkinsfilePath)
    .then(file => file.toString())
    .then(content => jenkinsfile.toJobConfig({jenkinsfile: content}))
    .then(config => jenkinsApi.checkIfJobExists({jobName})
      .then(jobExists =>
        jobExists ?
          jenkinsApi.updateJob({jobName, config}) :
          jenkinsApi.createJob({jobName, config})
      )
    )
    .catch(log.error)
}

const deleteJob = ({filePath, filenameWithExt, filenameWithoutExt}) => {
  log.debug(`File ${filenameWithExt} deleted...`)
  jenkinsApi.deleteJob({jobName: filenameWithoutExt})
}

module.exports = {
  createJob,
  updateJob,
  deleteJob
}
