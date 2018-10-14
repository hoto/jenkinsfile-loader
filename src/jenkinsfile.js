const xmlSanitizer = require('./xmlSanitizer.js')

const toJobConfig = ({jenkinsfile}) => {
  const sanitizedJenkinsfile = xmlSanitizer.sanitize({str: jenkinsfile})
  return configXml({sanitizedJenkinsfile})
}

const configXml = ({sanitizedJenkinsfile}) =>
  `<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@2.25">
  <description></description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition" plugin="workflow-cps@2.55">
    <script>
    ${sanitizedJenkinsfile}
    </script>
    <sandbox>true</sandbox>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
`

module.exports = {
  toJobConfig
}
