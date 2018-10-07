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

function toJobConfig({jenkinsfile}) {
  const sanitizedJenkinsfile = sanitize({code: jenkinsfile})
  return configXml({sanitizedJenkinsfile})
}

function sanitize({code}) {
  return sanitizeHTML(code)
}

function sanitizeHTML(str) {
  const rAmp = /&/g;
  const rLt = /</g;
  const rGt = />/g;
  const rApos = /\'/g;
  const rQuot = /\"/g;
  const hChars = /[&<>\"\']/;
  if (hChars.test(String(str)))
    return str
      .replace(rAmp, '&amp;')
      .replace(rLt, '&lt;')
      .replace(rGt, '&gt;')
      .replace(rApos, '&apos;')
      .replace(rQuot, '&quot;');
  return str;
}

module.exports = {
  toJobConfig,
  sanitize
}
