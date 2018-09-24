const fs = require('fs-promise');
const axios = require('axios')

const JENKINS_URL = 'http://localhost:8080'
const jenkins = axios.create({
  baseURL: JENKINS_URL,
  timeout: 10000,
})
const configFile = '/home/andrzej.rehmann/projects/hoto/rapid-jenkinsfile-loader/test/resources/config.xml'

fs
  .readFile(configFile)
  .then(data => {
    console.log(`Loaded file ${configFile}`)
    console.log(data.toString())
    createJob({
      jobName: 'my-new-job',
      data: data.toString()
    })
  })
  .catch(error => console.log(error))

function createJob({jobName, data}) {
  const options = {
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: data,
    url: `/createItem?name=${jobName}`
  }
  jenkins(options)
    .then(response => console.log(response.config))
    .catch(error => console.log(error.config))
}
