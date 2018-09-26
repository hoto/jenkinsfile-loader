const jenkins = require('../src/jenkins.js')
const axios = require('axios')

jest.mock('axios')

const JOB_NAME = "JOB_NAME";

describe("jenkins should", () => {

  it("create a new job", () => {
    jenkins.createJob({jobName: JOB_NAME})

    expect(axios.get).toHaveBeenCalledWith('url')
  })

})
