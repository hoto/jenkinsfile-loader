const fs = require('fs-promise');
const axios = require('axios')
const log = require('./logger.js')

const JENKINS_URL = 'http://localhost:8080'
const jenkins = axios.create({
  baseURL: JENKINS_URL,
  timeout: 10000,
})
const configFile = '/home/andrzej.rehmann/projects/hoto/rapid-jenkinsfile-loader/test/resources/config.xml'
const jobName = 'my-new-job';

fs
  .readFile(configFile)
  .then(config => {
    log.info(`Loaded config file ${configFile}...`)
    downloadJobConfig({jobName})
      .then(config => {
        log.info('got the config', config)
      })
      .catch(error => log.error(error))
    // createJob({
    //   jobName,
    //   config: data.toString()
    // })
  })
  .catch(error => log.error(error))

function downloadJobConfig({jobName}) {
  log.info(`Downloading config for job ${jobName}...`)
  return jenkins.get(`/job/${jobName}/config.xml`)
}

function updateJob({jobName, config}) {

}

function createJob({jobName, config}) {
  log.info(`Creating new job ${jobName}...`)
  const options = {
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `/createItem?name=${jobName}`
  }
  return jenkins(options)
    .then(response => log.debug(response.status))
    .catch(error => log.error(error.response.headers['x-error']))
}

