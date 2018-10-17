const jenkins = require('../src/jenkins.js')
const jenkinsApi = require('../src/jenkinsApi.js')
const jenkinsfile = require('../src/jenkinsfile.js')
const log = require('../src/log.js')

jest.mock('../src/jenkinsApi.js')
jest.mock('../src/jenkinsfile.js')
jest.mock('../src/log.js')

const JOB_NAME = 'JOB_NAME'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const CONFIG_XML = 'CONFIG_XML'

describe('jenkins should', () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('create job when it does not exist', async () => {
    const file = Promise.resolve()
    jenkinsfile.toJobConfig = jest.fn(() => Promise.resolve(CONFIG_XML))
    jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(false))

    await jenkins.createJob({file, filenameWithoutExt: JOB_NAME})

    expect(jenkinsApi.createJob)
      .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
  })

  it('update job when it does exist', async () => {
    const file = Promise.resolve()
    jenkinsfile.toJobConfig = jest.fn(() => Promise.resolve(CONFIG_XML))
    jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(true))

    await jenkins.createJob({file, filenameWithoutExt: JOB_NAME})

    expect(jenkinsApi.updateJob)
      .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
  })

  it('log error when creating or updating job fails', async () => {
    const file = Promise.resolve()
    jenkinsApi.checkIfJobExists = jest.fn(() => Promise.reject(ERROR_MESSAGE))

    await jenkins.createJob({file, filenameWithoutExt: JOB_NAME})

    expect(log.error).toHaveBeenCalledWith(ERROR_MESSAGE)
  })

  it('delete job', async () => {
    jenkinsApi.deleteJob = jest.fn(() => Promise.resolve())

    await jenkins.deleteJob({filenameWithoutExt: JOB_NAME})

    expect(jenkinsApi.deleteJob).toHaveBeenCalledWith({jobName: JOB_NAME})
  })

  it('log error when deleting job fails', async () => {
    jenkinsApi.deleteJob = jest.fn(() => Promise.reject(ERROR_MESSAGE))

    await jenkins.deleteJob({filenameWithoutExt: JOB_NAME})

    expect(log.error).toHaveBeenCalledWith(ERROR_MESSAGE)
  })

})
