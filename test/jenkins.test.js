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

  describe('use job config in xml format to', () => {

    let xmlFile

    beforeEach(() => {
      xmlFile = Promise.resolve(CONFIG_XML)
    })

    it('create job when it does not exist', async () => {
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(false))

      await jenkins.createJobFromConfig({file: xmlFile, filenameWithoutExt: JOB_NAME})

      expect(jenkinsApi.createJob)
        .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
    })

    it('update job when it does exist', async () => {
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(true))

      await jenkins.updateJobFromConfig({file: xmlFile, filenameWithoutExt: JOB_NAME})

      expect(jenkinsApi.updateJob)
        .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
    })

    it('log error when creating or updating job fails', async () => {
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.reject(ERROR_MESSAGE))

      await jenkins.createJobFromConfig({file: xmlFile, filenameWithoutExt: JOB_NAME})

      expect(log.error).toHaveBeenCalledWith(ERROR_MESSAGE)
    })

  })

  describe('use jenkinsfile to', () => {

    let groovyFile

    beforeEach(() => {
      groovyFile = Promise.resolve()
    })

    it('create job when it does not exist', async () => {
      jenkinsfile.toJobConfig = jest.fn(() => Promise.resolve(CONFIG_XML))
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(false))

      await jenkins.createJobFromJenkinsfile({file: groovyFile, filenameWithoutExt: JOB_NAME})

      expect(jenkinsApi.createJob)
        .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
    })

    it('update job when it does exist', async () => {
      jenkinsfile.toJobConfig = jest.fn(() => Promise.resolve(CONFIG_XML))
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.resolve(true))

      await jenkins.createJobFromJenkinsfile({file: groovyFile, filenameWithoutExt: JOB_NAME})

      expect(jenkinsApi.updateJob)
        .toHaveBeenCalledWith({jobName: JOB_NAME, configXml: CONFIG_XML})
    })

    it('log error when creating or updating job fails', async () => {
      jenkinsApi.checkIfJobExists = jest.fn(() => Promise.reject(ERROR_MESSAGE))

      await jenkins.createJobFromJenkinsfile({file: groovyFile, filenameWithoutExt: JOB_NAME})

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

})
