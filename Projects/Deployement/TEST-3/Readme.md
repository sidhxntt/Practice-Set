# ECS & ECR
Deploying a containerized full-stack application (Next.js frontend and Express backend) on AWS involves a series of detailed steps, from containerization to setting up infrastructure on AWS. Here's an in-depth guide to each step:

### **1. Prepare Your Containers**

#### **1.1. Dockerize the Next.js Frontend**
- **Create a `Dockerfile` for the Frontend:**
  - Your `Dockerfile` for Next.js might look something like this:
    ```Dockerfile
    # Stage 1: Build the React application
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile
    COPY . .
    RUN yarn build

    # Stage 2: Serve the application with Next.js server
    FROM node:18-alpine
    WORKDIR /app
    COPY --from=builder /app ./
    EXPOSE 3000
    CMD ["yarn", "start"]
    ```
  - **Explanation:**
    - **Stage 1**: Builds the application.
    - **Stage 2**: Serves the built application using the Next.js server.

#### **1.2. Dockerize the Express Backend**
- **Create a `Dockerfile` for the Backend:**
  - Your `Dockerfile` for Express might look like this:
    ```Dockerfile
    FROM node:18-alpine
    WORKDIR /app
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile
    COPY . .
    EXPOSE 4000
    CMD ["node", "index.js"]
    ```
  - **Explanation:**
    - This Dockerfile installs dependencies and starts the Express server.

#### **1.3. Test Locally with Docker Compose**
- **Create a `docker-compose.yml` File**:
  - Use Docker Compose to manage both containers together.
    ```yaml
    version: '3'
    services:
      frontend:
        build: ./frontend
        ports:
          - "3000:3000"
      backend:
        build: ./backend
        ports:
          - "4000:4000"
        environment:
          - NODE_ENV=production
    ```
  - **Run the Compose File**:
    ```bash
    docker-compose up --build
    ```
  - **Test Your Application**:
    - Ensure that both the frontend and backend are working correctly on your local machine.

### **2. Push Docker Images to Amazon ECR (Elastic Container Registry)**

#### **2.1. Create ECR Repositories**
- **Go to the Amazon ECR Dashboard**:
  - Navigate to **ECR** in the AWS Management Console.
  - Click on **Create Repository**.
  - Create a repository for both your frontend and backend containers.

#### **2.2. Build and Tag Docker Images**
- **Tag Your Docker Images**:
  - Use the ECR repository URI to tag your images.
  - Example:
    ```bash
    docker build -t your-frontend-repo-uri ./frontend
    docker build -t your-backend-repo-uri ./backend
    ```

#### **2.3. Authenticate Docker to ECR**
- **Login to ECR**:
  - Use the AWS CLI to authenticate Docker with your ECR registry:
    ```bash
    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com
    ```
  - Replace `us-east-1` and `your-account-id` with your actual AWS region and account ID.

#### **2.4. Push Images to ECR**
- **Push the Images**:
  - Push the tagged images to ECR:
    ```bash
    docker push your-frontend-repo-uri
    docker push your-backend-repo-uri
    ```

### **3. Deploy Using Amazon ECS (Elastic Container Service)**

#### **3.1. Create an ECS Cluster**
- **Go to the ECS Dashboard**:
  - Navigate to **ECS** in the AWS Management Console.
  - Click on **Create Cluster**.
  - Choose either **Fargate** for serverless containers or **EC2** for VM-based containers.
  - Configure your cluster with the desired VPC and subnets.

#### **3.2. Create Task Definitions**
- **Define a Task for the Frontend**:
  - Go to **Task Definitions** and click **Create new Task Definition**.
  - Choose Fargate or EC2, depending on your cluster.
  - Specify the container details, including:
    - **Container Name**
    - **Image URI** (from ECR)
    - **Port Mappings** (e.g., 3000:3000 for the frontend)
    - **Environment Variables** if needed
- **Define a Task for the Backend**:
  - Repeat the above steps for the backend container (e.g., 4000:4000).

#### **3.3. Create Services**
- **Go to Services**:
  - Click **Create Service**.
  - Choose your cluster and the task definition you just created.
  - Specify the number of desired tasks (containers) for high availability.
  - Configure service networking (e.g., VPC, subnets, security groups).
  - Repeat the process for both frontend and backend services.

### **4. Set Up Networking**

#### **4.1. VPC and Subnets**
- **Ensure Your Cluster is in a VPC**:
  - The cluster should be set up within a VPC with at least one public subnet for the frontend and one private subnet for the backend.
- **Create Security Groups**:
  - Set up security groups to control access to your services.
  - Allow HTTP/HTTPS traffic to the frontend.
  - Restrict backend traffic to only allow requests from the frontend service.

#### **4.2. Application Load Balancer (ALB)**
- **Set Up an ALB**:
  - Go to the EC2 dashboard and create an Application Load Balancer.
  - Configure listeners for HTTP (port 80) or HTTPS (port 443).
  - Set up target groups for your frontend and backend ECS services.
  - Configure routing rules to direct traffic to the appropriate service based on paths (e.g., `/api` for the backend).

### **5. Configure DNS with Route 53 (Optional)**
- **Set Up a Custom Domain Name**:
  - Go to the Route 53 dashboard and create a hosted zone for your domain.
  - Add an A record pointing to the ALB.
  - If you don't have a custom domain, you can use the ALB's DNS name.

### **6. Set Up CI/CD with AWS CodePipeline (Optional)**
- **Automate the Build and Deploy Process**:
  - Go to the AWS CodePipeline dashboard and create a new pipeline.
  - Add stages for:
    - **Source**: Connect to your GitHub or other source repository.
    - **Build**: Use AWS CodeBuild to build and push Docker images to ECR.
    - **Deploy**: Use AWS CodeDeploy to deploy the updated images to ECS.
  - Configure triggers to automatically deploy when you push changes to your source repository.

### **7. Monitor and Scale**

#### **7.1. Use CloudWatch**
- **Monitor ECS Services**:
  - Go to the CloudWatch dashboard to set up monitoring for your ECS services.
  - Track CPU, memory usage, and other metrics.
  - Set up alarms to notify you of issues.

#### **7.2. Set Up Auto-Scaling**
- **Auto-Scaling in ECS**:
  - Go to the ECS service and configure auto-scaling based on metrics like CPU utilization.
  - Set minimum and maximum task counts to ensure availability during traffic spikes.

### **8. Security Considerations**

#### **8.1. IAM Roles**
- **Assign IAM Roles**:
  - Use IAM roles to grant permissions to your ECS tasks.
  - Ensure that only the necessary permissions are given, following the principle of least privilege.

#### **8.2. Secrets Management**
- **Use AWS Secrets Manager or SSM Parameter Store**:
  - Store sensitive information such as API keys or database credentials.
  - Retrieve these secrets securely in your ECS tasks.

### **9. Test Your Deployment**
- **Access the Application**:
  - Use the DNS name provided by Route 53 or the public IP from the ALB.
  - Verify that both the frontend and backend are functioning correctly.
  - Test various endpoints and user interactions.

### **Summary**
This detailed process covers everything from Dockerizing your application to deploying it on AWS using ECS and ECR, with considerations for networking, security, and monitoring. Depending on your application’s specific needs, you might need to adapt these steps, but this guide should provide a solid foundation for deploying a full-stack application on AWS.