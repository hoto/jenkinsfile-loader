const jenkinsApi = require('../src/jenkinsApi.js')
const config = require('../src/config.js')
const log = require('../src/log.js')
const axiosOriginal = require('axios')
const MockAdapter = require('axios-mock-adapter')

jest.mock('../src/config.js')
jest.mock('../src/log.js')

const axios = new MockAdapter(axiosOriginal)

const JENKINS_URL = 'JENKINS_URL'
const JOB_NAME = 'JOB_NAME'
const JOB_CONFIG = 'JOB_CONFIG'
const ACCEPT = 'application/json, application/xml, text/plain, */*'
const XML_HEADERS = {
  Accept: ACCEPT,
  'Content-Type': 'text/xml'
}

describe('jenkinsApi should', () => {

  beforeEach(() => {
    config.jenkinsUrl = JENKINS_URL
  })

  it('update job', async () => {
    axios
      .onPost('JENKINS_URL/job/JOB_NAME/config.xml', JOB_CONFIG, XML_HEADERS)
      .reply(200)

    const response = await jenkinsApi.updateJob({jobName: JOB_NAME, configXml: JOB_CONFIG})

    expect(response.status).toBe(200)
    expect(log.info).toHaveBeenCalledWith('Updating job JOB_NAME...')
  })

  it('create job', async () => {
    axios
      .onPost('JENKINS_URL/createItem?name=JOB_NAME', JOB_CONFIG, XML_HEADERS)
      .reply(200)

    const response = await jenkinsApi.createJob({jobName: JOB_NAME, configXml: JOB_CONFIG})

    expect(response.status).toBe(200)
    expect(log.info).toHaveBeenCalledWith('Creating job JOB_NAME...')
  })

  it('delete job', async () => {
    axios.onPost('JENKINS_URL/job/JOB_NAME/doDelete').reply(200)

    const response = await jenkinsApi.deleteJob({jobName: JOB_NAME})

    expect(response.status).toBe(200)
    expect(log.info).toHaveBeenCalledWith('Deleting job JOB_NAME...')
  })

})
