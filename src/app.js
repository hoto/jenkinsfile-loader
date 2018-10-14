const fs = require('fs-promise')
const jenkinsApi = require('./jenkinsApi.js')
const log = require('./log.js')
const jenkinsfile = require('./jenkinsfile.js')
const config = require('./config.js')
const watcher = require('./watcher.js')

const jenkinsfilesDir = config.jenkinsfilesDir

const startWatching = () => {
  watcher
    .watch({dir: jenkinsfilesDir})
    .on('add', filePath => createJob({filePath}))
    .on('change', filePath => updateJob({filePath}))
    .on('unlink', filePath => deleteJob({filePath}))
}

const createJob = ({filePath}) => {
  const filenameWithExt = getFilenameWithExtension(filePath)
  const jobName = getFilenameWithoutExtension(filePath)
  log.debug(`File ${filenameWithExt} added...`)
  createOrUpdateJob({jenkinsfilePath: filePath, jobName})
}

const updateJob = ({filePath}) => {
  const filenameWithExt = getFilenameWithExtension(filePath)
  const jobName = getFilenameWithoutExtension(filePath)
  log.debug(`File ${filenameWithExt} updated...`)
  createOrUpdateJob({jenkinsfilePath: filePath, jobName})
}

const deleteJob = ({filePath}) => {
  const filenameWithExt = getFilenameWithExtension(filePath)
  const jobName = getFilenameWithoutExtension(filePath)
  log.debug(`File ${filenameWithExt} deleted...`)
  jenkinsApi.deleteJob({jobName})
}

const getFilenameWithExtension = (path) => path.split('/').pop()
const getFilenameWithoutExtension = (path) => getFilenameWithExtension(path).split('.')[0]
const runAppForever = () => process.stdin.resume()

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

startWatching()
runAppForever()
