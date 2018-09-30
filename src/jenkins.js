const axios = require('axios')
const log = require('./logger.js')

const jenkinsUrl = 'http://localhost:8080'

function checkIfJobExists({name}) {
  return axios.get(`${jenkinsUrl}/api/json`, {headers: {'Content-Type': 'application/json'}})
    .then(response => response.data.jobs)
    .then(jobs => jobs.map(job => job.name))
    .then(jobNamesObjects => jobNamesObjects.reduce((nameA, nameB) => nameA.concat(nameB), []))
    .then(jobNames => (jobNames.indexOf(name) > -1))
}

function updateJob({name, config}) {
  log.info(`Updating job [${name}]...`)
  return axios({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `${jenkinsUrl}/job/${name}/config.xml`
  })
}

function createJob({name, config}) {
  log.info(`Creating new job [${name}]...`)
  return axios({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `${jenkinsUrl}/createItem?name=${name}`
  })
}

module.exports = {
  checkIfJobExists,
  updateJob,
  createJob
}
