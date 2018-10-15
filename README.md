[![](https://images.microbadger.com/badges/image/hoto/rapid-jenkinsfile-loader.svg)](https://microbadger.com/images/hoto/rapid-jenkinsfile-loader "Get your own image badge on microbadger.com")
# Rapid Jenkinsfile Loader

| System variables  | Description |
| ----------------- | ----------- |
| JENKINS_URL       | URL to a jenkins instance without authentication.  |
| JENKINSFILES_DIR  | Full path to directory where Jenkinsfiles are located.  |
| DEBUG             | Enable debug mode by setting to 'true'  |

Run with nodejs:

    yarn install
    yarn test
    yarn start

Run with docker:

    docker-compose build
    docker-compose up
