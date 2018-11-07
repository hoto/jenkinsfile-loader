const defaultJenkinsUrl = 'http://localhost:8080';
const defaultJenkinsfilesDir = process.cwd() + '/jenkinsfiles';
const defaultConfigsXmlDir = process.cwd() + '/configs';

const config = {
  jenkinsUrl: process.env.JENKINS_URL || defaultJenkinsUrl,
  jenkinsfilesDir: process.env.JENKINSFILES_DIR || defaultJenkinsfilesDir,
  configsXmlDir: process.env.CONFIGS_XML_DIR || defaultConfigsXmlDir,
  isDebug: process.env.DEBUG === 'true' || false
}

if (config.isDebug) console.log('App config:\n', config)

module.exports = config
