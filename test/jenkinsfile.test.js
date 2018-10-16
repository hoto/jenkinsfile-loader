const jenkinsfile = require('../src/jenkinsfile.js')
const resources = require('./resources.js')

describe('jenkinsfile should', () => {

  it('transform jenkinsfile to a job config', async () => {
    const pipelineCode = await resources.read({name: 'pipeline.original'})
    const jobConfig = await resources.read({name: 'jobConfig.xml'})

    const response = jenkinsfile.toJobConfig({jenkinsfile: pipelineCode})

    expect(response).toEqual(jobConfig)
    expect(response.length).toBe(631)
  })
})

