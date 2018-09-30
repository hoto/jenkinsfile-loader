const jenkinsfile = require('../src/jenkinsfile.js')
const fs = require('fs-promise')

describe('jenkinsfile should', () => {

  it('escape all html chars when transforming to config xml', async () => {
    const original = await loadFile({name: 'original'})
    const sanitized = await loadFile({name: 'sanitized'})

    const response = jenkinsfile.sanitize({code: original})

    expect(response).toEqual(sanitized)
  })

})

function loadFile({name}) {
  const filePath = process.cwd() + `/test/resources/pipeline.${name}`
  return fs
    .readFile(filePath)
    .then(file => file.toString())
}
