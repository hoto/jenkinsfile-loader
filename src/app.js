const fs = require('fs-promise')
const jenkins = require('./jenkins.js')
const log = require('./log.js')
const jenkinsfile = require('./jenkinsfile.js')
const chokidar = require('chokidar')

const jenkinsfilePath = process.cwd() + '/test/resources/pipeline.original'
const name = 'job-a'

const dirToWatch = process.cwd() + '/jenkinsfiles'
const watcher = chokidar.watch(dirToWatch, {
  ignored: /(^|[\/\\])\../,
  persistent: true
})

watcher
  .on('add', path => log.debug(`File ${path} has been added`))
  .on('change', path => log.debug(`File ${path} has been changed`))
  .on('unlink', path => log.debug(`File ${path} has been removed`));

process.stdin.resume();
// fs
//   .readdir(process.cwd())
//   .then(console.log)
//
// fs
//   .readFile(jenkinsfilePath)
//   .then(file => file.toString()
//   .then(content => jenkinsfile.toJobConfig({jenkinsfile: content}))
//   .then(config => jenkins.checkIfJobExists({name})
//     .then(jobExists =>
//       jobExists ?
//         jenkins.updateJob({name, config}) :
//         jenkins.createJob({name, config})
//     )
//   )
//   .catch(log.error)

