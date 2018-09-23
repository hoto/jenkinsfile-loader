const axios = require('axios')

axios.get('http://localhost:8080/api/json')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log('Error...')
    console.log(error)
  })

