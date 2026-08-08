pipeline {
    // Defines where the pipeline runs. 'any' means it runs on any available Jenkins agent.
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                // Installs your project's node modules
                sh 'npm ci'
                // Installs the Playwright browsers and their operating system dependencies
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Runs your Playwright test suite
                sh 'npx playwright test'
            }
        }
    }

    // The post section always runs, even if the tests fail
    post {
        always {
            // Archives the Playwright HTML report so you can view it directly in Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}