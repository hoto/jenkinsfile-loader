const jenkinsApi = require('./jenkinsApi.js')
const jenkinsfile = require('./jenkinsfile.js')
const log = require('./log.js')

const createJobFromConfig = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt, isConfigXml: true})

const updateJobFromConfig = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt, isConfigXml: true})

const createJobFromJenkinsfile = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt})

const updateJobFromJenkinsfile = ({file, filenameWithoutExt}) =>
  createOrUpdateJob({file, jobName: filenameWithoutExt})

const createOrUpdateJob = ({file, jobName, isConfigXml}) =>
  file
    .then(content =>
      isConfigXml ? content : jenkinsfile.toJobConfig({jenkinsfile: content})
    )
    .then(configXml => jenkinsApi.checkIfJobExists({jobName})
      .then(jobExists =>
        jobExists ?
          jenkinsApi.updateJob({jobName, configXml}) :
          jenkinsApi.createJob({jobName, configXml})
      )
    )
    .catch(log.error)

const deleteJob = ({filenameWithoutExt}) =>
  jenkinsApi
    .deleteJob({jobName: filenameWithoutExt})
    .catch(log.error)

module.exports = {
  createJobFromConfig,
  updateJobFromConfig,
  createJobFromJenkinsfile,
  updateJobFromJenkinsfile,
  deleteJob
}
