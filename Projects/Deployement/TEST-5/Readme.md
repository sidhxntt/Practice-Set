# Docker, K8s & EKS
Deploying a full-stack application using AWS EKS (Elastic Kubernetes Service) involves several steps, including setting up the EKS cluster, configuring your application’s Kubernetes manifests, and deploying the application using these manifests. Below is a step-by-step guide to help you with the deployment.

### Prerequisites

1. **AWS Account**: Ensure you have an AWS account.
2. **AWS CLI**: Install and configure the AWS CLI on your local machine.
3. **kubectl**: Install `kubectl` to interact with your Kubernetes cluster.
4. **eksctl**: Install `eksctl` to simplify EKS cluster creation.
5. **Docker**: Ensure Docker is installed and running to build your images.

### Step 1: Create an EKS Cluster

1. **Create an EKS Cluster using eksctl**:

   ```bash
   eksctl create cluster --name my-cluster --region us-west-2 --nodegroup-name my-nodes --node-type t2.micro --nodes 2 --nodes-min 1 --nodes-max 3 --managed
   ```

   This command creates a simple EKS cluster with a managed node group. Adjust the parameters as per your requirements.

2. **Configure kubectl**:

   Once the cluster is created, configure `kubectl` to connect to your EKS cluster:

   ```bash
   aws eks --region us-west-2 update-kubeconfig --name my-cluster
   ```

### Step 2: Build and Push Docker Images

1. **Build Docker Images**:

   Assuming your `Dockerfile` is ready for both frontend and backend:

   ```bash
   docker build -t my-frontend:latest ./frontend
   docker build -t my-backend:latest ./backend
   ```

2. **Push Docker Images to ECR (Elastic Container Registry)**:

   - Create ECR repositories:

     ```bash
     aws ecr create-repository --repository-name my-frontend --region us-west-2
     aws ecr create-repository --repository-name my-backend --region us-west-2
     ```

   - Authenticate Docker to ECR:

     ```bash
     aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com
     ```

   - Tag and push the images:

     ```bash
     docker tag my-frontend:latest <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-frontend:latest
     docker tag my-backend:latest <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-backend:latest

     docker push <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-frontend:latest
     docker push <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-backend:latest
     ```

### Step 3: Prepare Kubernetes Manifests

1. **Create Kubernetes Deployment and Service Manifests**:

   - For the frontend (`frontend-deployment.yaml`):

     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: frontend-deployment
     spec:
       replicas: 2
       selector:
         matchLabels:
           app: frontend
       template:
         metadata:
           labels:
             app: frontend
         spec:
           containers:
           - name: frontend
             image: <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-frontend:latest
             ports:
             - containerPort: 3000
     ---
     apiVersion: v1
     kind: Service
     metadata:
       name: frontend-service
     spec:
       type: LoadBalancer
       selector:
         app: frontend
       ports:
         - protocol: TCP
           port: 80
           targetPort: 3000
     ```

   - For the backend (`backend-deployment.yaml`):

     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: backend-deployment
     spec:
       replicas: 2
       selector:
         matchLabels:
           app: backend
       template:
         metadata:
           labels:
             app: backend
         spec:
           containers:
           - name: backend
             image: <aws_account_id>.dkr.ecr.us-west-2.amazonaws.com/my-backend:latest
             ports:
             - containerPort: 5000
     ---
     apiVersion: v1
     kind: Service
     metadata:
       name: backend-service
     spec:
       type: ClusterIP
       selector:
         app: backend
       ports:
         - protocol: TCP
           port: 5000
           targetPort: 5000
     ```

2. **Apply the Manifests**:

   Deploy the frontend and backend to the EKS cluster:

   ```bash
   kubectl apply -f frontend-deployment.yaml
   kubectl apply -f backend-deployment.yaml
   ```

### Step 4: Access the Application

1. **Get the LoadBalancer URL**:

   After applying the frontend service manifest, the EKS LoadBalancer will be provisioned by AWS. Run the following command to get the external IP:

   ```bash
   kubectl get svc frontend-service
   ```

2. **Access the Application**:

   Use the external IP or DNS name of the LoadBalancer to access your frontend, which should communicate with the backend via the service's internal DNS name (e.g., `http://backend-service:5000`).

### Step 5: Monitor and Manage

1. **Monitor Your Deployment**:

   Use `kubectl` commands to monitor your deployments:

   ```bash
   kubectl get pods
   kubectl get svc
   kubectl logs <pod-name>
   ```

2. **Scaling**:

   To scale your application, you can adjust the `replicas` field in your deployment manifests and reapply them, or use the following command:

   ```bash
   kubectl scale deployment frontend-deployment --replicas=3
   ```

### Conclusion

This guide provides a basic overview of deploying a containerized full-stack application on AWS EKS. Depending on your application’s complexity, you might need to configure additional resources like ConfigMaps, Secrets, Ingress controllers, and persistent storage.