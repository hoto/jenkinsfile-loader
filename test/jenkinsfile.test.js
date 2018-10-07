const jenkinsfile = require('../src/jenkinsfile.js')
const fs = require('fs-promise')

describe('jenkinsfile should', () => {

  it('escape all html chars when transforming to config xml', async () => {
    const original = await loadFile({name: 'pipeline.original'})
    const sanitized = await loadFile({name: 'pipeline.sanitized'})

    const response = jenkinsfile.sanitize({code: original})

    expect(response).toEqual(sanitized)
  })

  it('transform jenkinsfile to a job config', async () => {
    const pipelineCode = await loadFile({name: 'pipeline.original'})
    const jobConfig = await loadFile({name: 'jobConfig.xml'})

    const response = jenkinsfile.toJobConfig({jenkinsfile: pipelineCode})

    expect(response).toEqual(jobConfig)
  })
})

function loadFile({name}) {
  const filePath = process.cwd() + `/test/resources/${name}`
  return fs
    .readFile(filePath)
    .then(file => file.toString())
}
