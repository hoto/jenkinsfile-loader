const jenkinsUrl = process.env.JENKINS_URL || 'http://localhost:8080'
const jenkinsfilesDir = process.env.JENKINSFILES_DIR || process.cwd() + '/jenkinsfile-examples'

module.exports = {
  jenkinsUrl,
  jenkinsfilesDir
}
