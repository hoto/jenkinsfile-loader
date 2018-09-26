const jenkins = require('../src/jenkins.js')
const axios = require('axios')

jest.mock('axios')

const JOB_CONFIG = 'JOB_CONFIG'
const JOB_NAME = 'JOB_NAME'

describe('jenkins should', () => {

  it('create a new job', () => {
    jenkins.createJob({
      name: JOB_NAME,
      config: JOB_CONFIG
    })

    expect(axios).toHaveBeenCalledWith({
      method: 'POST',
      headers: {'content-type': 'text/xml'},
      data: JOB_CONFIG,
      url: `/createItem?name=${JOB_NAME}`
    })
  })

})

