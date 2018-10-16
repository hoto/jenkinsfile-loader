const axios = require('axios')
const log = require('./log.js')
const config = require('./config.js')

const checkIfJobExists = ({jobName}) =>
  axios
    .get(
      `${config.jenkinsUrl}/api/json`,
      {headers: {'Content-Type': 'application/json'}}
    )
    .then(response => response.data.jobs)
    .then(jobs => jobs.map(job => job.name))
    .then(jobNamesObjects =>
      jobNamesObjects.reduce((nameA, nameB) => nameA.concat(nameB), []))
    .then(jobNames => (jobNames.indexOf(jobName) > -1))

const updateJob = ({jobName, config}) => {
  log.info(`Updating job ${jobName}...`)
  return axios({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `${config.jenkinsUrl}/job/${jobName}/config.xml`
  })
}

const createJob = ({jobName, config}) => {
  log.info(`Creating job ${jobName}...`)
  return axios({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `${config.jenkinsUrl}/createItem?name=${jobName}`
  })
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
