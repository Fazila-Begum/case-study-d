pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')  // Jenkins credentials ID
        IMAGE_NAME = "fazilabegum/memory-game"
        KUBECONFIG_CREDENTIALS = credentials('kubeconfig')  // if using Jenkins credentials for kube access
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/fazilabegum/memory-game.git' // replace if your repo name differs
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t fazilabegum/memory-game:${BUILD_NUMBER} .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                docker push fazilabegum/memory-game:${BUILD_NUMBER}
                docker tag fazilabegum/memory-game:${BUILD_NUMBER} fazilabegum/memory-game:latest
                docker push fazilabegum/memory-game:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f deployment.yaml
                kubectl rollout restart deployment/memory-game-deployment
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Build or Deployment Failed!'
        }
    }
}
