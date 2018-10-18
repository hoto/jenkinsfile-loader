const defaultJenkinsUrl = 'http://localhost:8080';
const defaultJenkinsfilesDir = process.cwd() + '/jenkinsfiles';

const config = {
  jenkinsUrl: process.env.JENKINS_URL || defaultJenkinsUrl,
  jenkinsfilesDir: process.env.JENKINSFILES_DIR || defaultJenkinsfilesDir,
  isDebug: process.env.DEBUG === 'true' || false
}

if (config.isDebug) console.log('App config:\n', config)

module.exports = config
