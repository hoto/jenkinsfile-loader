[![CircleCI](https://circleci.com/gh/hoto/jenkinsfile-loader/tree/master.svg?style=svg)](https://circleci.com/gh/hoto/jenkinsfile-loader/tree/master)
[![](https://images.microbadger.com/badges/image/hoto/jenkinsfile-loader.svg)](https://microbadger.com/images/hoto/jenkinsfile-loader "Get your own image badge on microbadger.com")
# Jenkinsfile Loader

Creates Jenkins jobs from Jenkinsfiles and XML Configs read from disk.
Part of [jenkinsfile-examples](https://github.com/hoto/jenkinsfile-examples)

Usage:

| System variables  | Description |
| ----------------- | ----------- |
| JENKINS_URL       | URL to a jenkins instance without authentication.  |
| JENKINSFILES_DIR  | Full path to directory where Jenkinsfiles are located.  |
| CONFIGS_XML_DIR   | Full path to directory where Config XMLs are located.  |
| DEBUG             | Enable debug mode by setting to 'true'  |

Run with nodejs:

    yarn install
    yarn test
    yarn start

Run with docker:

    docker-compose build
    docker-compose up
