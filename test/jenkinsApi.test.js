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
const JOB_NAME_1 = 'JOB_NAME_1'
const JOB_CONFIG = 'JOB_CONFIG'
const ACCEPT = 'application/json, application/xml, text/plain, */*'
const XML_HEADERS = {
  Accept: ACCEPT,
  'Content-Type': 'text/xml'
}
const JSON_HEADERS = {
  Accept: ACCEPT,
  'Content-Type': 'application/json'
}

describe('jenkinsApi should', () => {

  beforeEach(() => {
    config.jenkinsUrl = JENKINS_URL
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('returns false if job does not exists', async () => {
    const responseData = {
      jobs: [
        {name: 'JOB_NAME_2'},
        {name: 'JOB_NAME_3'}
      ]
    }
    axios.onGet('JENKINS_URL/api/json', JSON_HEADERS).reply(200, responseData)

    const response = await jenkinsApi.checkIfJobExists({jobName: JOB_NAME_1})

    expect(response).toBe(false)
  })

  it('returns true if job exists', async () => {
    const responseData = {
      jobs: [
        {name: 'JOB_NAME_1'},
        {name: 'JOB_NAME_2'}
      ]
    }
    axios.onGet('JENKINS_URL/api/json', JSON_HEADERS).reply(200, responseData)

    const response = await jenkinsApi.checkIfJobExists({jobName: JOB_NAME_1})

    expect(response).toBe(true)
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
