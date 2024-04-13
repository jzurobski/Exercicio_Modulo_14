pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/jzurobski/Exercicio_Modulo_14.git'
                sh 'npm install'
                sh 'npx serverest@latest&'
            }
        }
        stage('Test') {
            steps {
                   sh 'NO_COLOR=1 npx cypress run'
            }
        }
    }
}
