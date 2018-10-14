const fs = require('fs-promise')

const read = ({name}) => {
  const filePath = process.cwd() + `/test/resources/${name}`
  return fs
    .readFile(filePath)
    .then(file => file.toString())
}

module.exports = {
  read
}
