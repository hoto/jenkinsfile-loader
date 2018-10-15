const log = require('../src/log.js')
const colors = require('colors/safe')
const config = require('../src/config.js')

jest.mock('colors/safe')

const MESSAGE = 'MESSAGE'

describe('logger should', () => {

  beforeEach(() => {
    mockTime(12, 10, 10)
    console.log = jest.fn()
  })

  it('log info in green', () => {
    colors.green = jest.fn(message => message)

    log.info(MESSAGE)

    expect(console.log).toHaveBeenCalledWith('12:10:10 MESSAGE')
  })

  it('log debug in cyan when debug is enabled', () => {
    config.isDebug = true
    colors.cyan = jest.fn(message => message)

    log.debug(MESSAGE)

    expect(console.log).toHaveBeenCalledWith('12:10:10 MESSAGE')
  })

  it('not log debug when debug is disabled', () => {
    config.isDebug = false
    colors.cyan = jest.fn(message => message)

    log.debug(MESSAGE)

    expect(console.log).not.toHaveBeenCalledWith('12:10:10 MESSAGE')
  })

  it('log warn in yellow', () => {
    colors.yellow = jest.fn(message => message)

    log.warn(MESSAGE)

    expect(console.log).toHaveBeenCalledWith('12:10:10 MESSAGE')
  })

  it('log error in red', () => {
    colors.red = jest.fn(message => message)

    log.error(MESSAGE)

    expect(console.log).toHaveBeenCalledWith('12:10:10 MESSAGE')
  })

})

function mockTime(hh, mm, ss) {
  const mockDate = new Date(`2010-01-20T${hh}:${mm}:${ss}`);
  global.Date = jest.fn(() => mockDate);
}
