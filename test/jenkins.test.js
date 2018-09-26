const jenkins = require('../src/jenkins.js')
const axios = require('axios')

jest.mock('axios')
const jenkinsApi = jest.fn()
axios.create = jest.fn(() => jenkinsApi)

const JOB_CONFIG = 'JOB_CONFIG'
const JOB_NAME = 'JOB_NAME'

describe('jenkins should', () => {

  it('set default jenkins url', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8080',
      timeout: 10000
    })
  })

  it('create a new job', () => {
    jenkins.createJob({
      name: JOB_NAME,
      config: JOB_CONFIG
    })

    expect(jenkinsApi).toHaveBeenCalledWith({
      method: 'POST',
      headers: {'content-type': 'text/xml'},
      data: JOB_CONFIG,
      url: `/createItem?name=${JOB_NAME}`
    })
  })

})

