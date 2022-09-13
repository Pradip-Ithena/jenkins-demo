pipeline {
    agent any

    stages {
        stage('Chekout') {
            steps {
                git 'https://github.com/Pradip-Ithena/jenkins-demo.git'
                echo 'Checkout Completed'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
