const xmlSanitizer = require('../src/xmlSanitizer.js')
const resources = require('./resources.js')

describe('xmlSanitizer should', () => {

  it('replace all xml-unfriendly chars', async () => {
    const original = await resources.read({name: 'pipeline.original'})
    const sanitized = await resources.read({name: 'pipeline.sanitized'})

    const response = xmlSanitizer.sanitize({str: original})

    expect(response).toEqual(sanitized)
    expect(response.length).toBe(215)
  })
})

