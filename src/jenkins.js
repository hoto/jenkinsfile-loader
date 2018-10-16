const jenkinsApi = require('./jenkinsApi.js')
const jenkinsfile = require('./jenkinsfile.js')
const log = require('./log.js')

const createJob = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt})


const updateJob = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt})

const createOrUpdateJob = ({file, jobName}) =>
  file
    .then(content => jenkinsfile.toJobConfig({jenkinsfile: content}))
    .then(config => jenkinsApi.checkIfJobExists({jobName})
      .then(jobExists =>
        jobExists ?
          jenkinsApi.updateJob({jobName, config}) :
          jenkinsApi.createJob({jobName, config})
      )
    )
    .catch(log.error)

const deleteJob = ({filenameWithoutExt}) =>
  jenkinsApi
    .deleteJob({jobName: filenameWithoutExt})
    .catch(log.error)

module.exports = {
  createJob,
  updateJob,
  deleteJob
}
