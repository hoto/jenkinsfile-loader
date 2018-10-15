const colors = require('colors/safe')
const config = require('./config.js')

function info() {
  console.log(colors.green(format(arguments)))
}

function debug() {
  if (config.isDebug)
    console.log(colors.cyan(format(arguments)))
}

function warn() {
  console.log(colors.yellow(format(arguments)))
}

function error() {
  console.log(colors.red(format(arguments)))
}

function format() {
  return `${time()} ${Array.prototype.slice.call(arguments[0]).join(' ')}`
}

const time = () => {
  const HH = new Date().getHours()
  const MM = new Date().getMinutes()
  const SS = new Date().getSeconds()
  return `${HH}:${MM}:${SS}`
}

module.exports = {
  info,
  debug,
  warn,
  error
}
