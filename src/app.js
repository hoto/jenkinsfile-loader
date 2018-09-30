const fs = require('fs-promise');
const log = require('./logger.js')
const axios = require('axios')

const jenkinsUrl = 'http://localhost:8080'
const configFile = process.cwd() + '/test/resources/config.xml'
const name = 'my-new-job';

fs
  .readFile(configFile)
  .then(configFile => configFile.toString())
  .then(config =>
    checkIfJobExists({name})
      .then(jobExists => {
        jobExists ? updateJob({name, config}) : createJob({name, config})
      })
  )
  .catch(log.error)

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

