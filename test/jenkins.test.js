const jenkins = require('../src/jenkins.js')
const jenkinsApi = require('../src/jenkinsApi.js')
const jenkinsfile = require('../src/jenkinsfile.js')
const log = require('../src/log.js')

jest.mock('../src/jenkinsApi.js')
jest.mock('../src/log.js')

const JOB_NAME = 'JOB_NAME'
const ERROR_MESSAGE = 'ERROR_MESSAGE'

describe('jenkins should', () => {

  it('delete job', async () => {
    jenkinsApi.deleteJob = jest.fn(() => Promise.resolve())

    await jenkins.deleteJob({filenameWithoutExt: JOB_NAME})

    expect(jenkinsApi.deleteJob).toBeCalledWith({jobName: JOB_NAME})
  })

  it('log error when deleting job fails', async () => {
    jenkinsApi.deleteJob = jest.fn(() => Promise.reject(ERROR_MESSAGE))

    await jenkins.deleteJob({filenameWithoutExt: JOB_NAME})

    expect(log.error).toBeCalledWith(ERROR_MESSAGE)
  })

})
