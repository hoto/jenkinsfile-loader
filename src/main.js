const app = require('./app.js')

const runAppForever = () => process.stdin.resume()

app.startWatching()
runAppForever()
