const jenkinsApi = require('../src/jenkinsApi.js')
const config = require('../src/config.js')
const log = require('../src/log.js')
const axios = require('axios')

jest.mock('../src/config.js')
jest.mock('../src/log.js')
jest.mock('axios')

const JENKINS_URL = 'JENKINS_URL'
const JOB_NAME = 'JOB_NAME'
const JOB_CONFIG = 'JOB_CONFIG'

describe('jenkinsApi should', () => {

  beforeEach(() => {
    config.jenkinsUrl = JENKINS_URL
  })

  it('update job', () => {
    jenkinsApi.updateJob({jobName: JOB_NAME, configXml: JOB_CONFIG})

    expect(log.info).toHaveBeenCalledWith('Updating job JOB_NAME...')
    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      headers: {'content-type': 'text/xml'},
      data: 'JOB_CONFIG',
      url: 'JENKINS_URL/job/JOB_NAME/config.xml'
    })
  })

  it('create job', () => {
    jenkinsApi.createJob({jobName: JOB_NAME, configXml: JOB_CONFIG})

    expect(log.info).toHaveBeenCalledWith('Creating job JOB_NAME...')
    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      headers: {'content-type': 'text/xml'},
      data: 'JOB_CONFIG',
      url: 'JENKINS_URL/createItem?name=JOB_NAME'
    })
  })

  it('delete job', () => {
    jenkinsApi.deleteJob({jobName: JOB_NAME})

    expect(log.info).toHaveBeenCalledWith('Deleting job JOB_NAME...')
    expect(axios.post).toHaveBeenCalledWith('JENKINS_URL/job/JOB_NAME/doDelete')
  })

})
