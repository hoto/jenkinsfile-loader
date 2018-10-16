const axios = require('axios')
const log = require('./log.js')
const config = require('./config.js')

const accept = 'application/json, application/xml, text/plain, */*'
const xmlHeaders = {
  headers: {
    Accept: accept,
    'Content-Type': 'text/xml'
  }
}
const jsonHeaders = {
  headers: {
    Accept: accept,
    'Content-Type': 'application/json'
  }
}

const checkIfJobExists = ({jobName}) =>
  axios
    .get(`${config.jenkinsUrl}/api/json`, jsonHeaders)
    .then(response => response.data.jobs)
    .then(jobs => jobs.map(job => job.name))
    .then(jobNamesObjects =>
      jobNamesObjects.reduce((nameA, nameB) => nameA.concat(nameB), []))
    .then(jobNames => (jobNames.indexOf(jobName) > -1))

const updateJob = ({jobName, configXml}) => {
  log.info(`Updating job ${jobName}...`)
  return axios
    .post(`${config.jenkinsUrl}/job/${jobName}/config.xml`, configXml, xmlHeaders)
}

const createJob = ({jobName, configXml}) => {
  log.info(`Creating job ${jobName}...`)
  return axios
    .post(`${config.jenkinsUrl}/createItem?name=${jobName}`, configXml, xmlHeaders)
}

const deleteJob = ({jobName}) => {
  log.info(`Deleting job ${jobName}...`)
  return axios.post(`${config.jenkinsUrl}/job/${jobName}/doDelete`)
}

module.exports = {
  checkIfJobExists,
  updateJob,
  createJob,
  deleteJob
}
