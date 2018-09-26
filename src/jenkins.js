const axios = require('axios')

const JENKINS_URL = 'http://localhost:8080'
const jenkinsApi = axios.create({
  baseURL: JENKINS_URL,
  timeout: 10000,
})

function createJob({name, config}) {
  jenkinsApi({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `/createItem?name=${name}`
  })
}

module.exports = {
  createJob
}
