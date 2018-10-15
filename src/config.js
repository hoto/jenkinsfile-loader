const config = {
  jenkinsUrl: process.env.JENKINS_URL || 'http://localhost:8080',
  jenkinsfilesDir: process.env.JENKINSFILES_DIR || process.cwd() + '/jenkinsfile-examples',
  isDebug: process.env.DEBUG || false
}

if (config.isDebug) console.log('App config:\n', config)

module.exports = config
