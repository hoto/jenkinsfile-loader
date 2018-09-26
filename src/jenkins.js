const axios = require('axios')

function createJob({name, config}) {
  axios({
    method: 'POST',
    headers: {'content-type': 'text/xml'},
    data: config,
    url: `/createItem?name=${name}`
  })
}

module.exports = {
  createJob
}
