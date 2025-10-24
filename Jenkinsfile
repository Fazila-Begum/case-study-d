pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')    // Jenkins Docker Hub credentials
        GITHUB_CREDENTIALS = 'github'                        // Jenkins GitHub credentials ID
        IMAGE_NAME = "fazilabegum/memory-game"
        KUBECONFIG_CREDENTIALS = credentials('kubeconfig')  // Jenkins kubeconfig credential
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    credentialsId: GITHUB_CREDENTIALS,
                    url: 'https://github.com/Fazila-Begum/case-study-d.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh """
                        export KUBECONFIG=\$KUBECONFIG_FILE
                        kubectl apply -f deployment.yaml
                        kubectl rollout restart deployment/memory-game-deployment
                    """
                }
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
