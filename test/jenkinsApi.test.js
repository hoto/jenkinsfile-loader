const jenkinsApi = require('../src/jenkinsApi.js')
const config = require('../src/config.js')
const log = require('../src/log.js')
const axios = require('axios')

jest.mock('../src/config.js')
jest.mock('../src/log.js')
jest.mock('axios')

const JENKINS_URL = 'JENKINS_URL'
const JOB_NAME = 'JOB_NAME'

describe('jenkinsApi should', () => {

  beforeEach(() => {
    config.jenkinsUrl = JENKINS_URL
  })

  it('delete job', () => {
    jenkinsApi.deleteJob({jobName: JOB_NAME})

    expect(log.info).toHaveBeenCalledWith('Deleting job JOB_NAME...')
    expect(axios.post).toHaveBeenCalledWith('JENKINS_URL/job/JOB_NAME/doDelete')
  })

})
