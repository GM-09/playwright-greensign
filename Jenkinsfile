pipeline {
    agent any

    environment {
        // Safe to leave as plain text because they are not secret
        BASE_URL = 'https://test-4.greensign.ai/'
        USER_EMAIL = 'ghulam_gs@proton.me'
        
        // This tells Jenkins to securely inject the password from the vault!
        USER_PASSWORD = credentials('greensign-test-password')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
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