# To deploy a Docker Compose application on AWS using an EC2 instance
(not recommended)

### PreRequists:
- Install Docker and Docker Compose on your local machine
- Install AWS CLI on your local machine
- Push the docker images to either AWS ECR or Docker hub private registry

### 1. **Set Up an EC2 Instance**
   - **Launch an EC2 instance**:
     - Go to the AWS Management Console.
     - Navigate to the EC2 service and launch a new instance.
     - Choose an Amazon Machine Image (AMI). The Ubuntu AMI is a common choice.
     - Select an instance type (e.g., t2.micro for small applications).
     - Configure the instance, including setting up security groups to allow necessary ports (e.g., 80 for HTTP, 443 for HTTPS, and any other ports your app needs).
     - Add a key pair to SSH into the instance.
     - Launch the instance.

   - **Connect to the EC2 instance**:
     - Use SSH to connect to your instance:
       ```sh
       ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
       ```

### 2. **Install Docker and Docker Compose**
   - **Update the package index**:
     ```sh
     sudo apt-get update
     ```
   - **Install Docker**:
     ```sh
     sudo apt-get install -y docker.io
     ```
   - **Install Docker Compose**:
     ```sh
     sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '(?<=tag_name": ")([0-9].[0-9].[0-9]+)')" -o /usr/local/bin/docker-compose
     sudo chmod +x /usr/local/bin/docker-compose
     ```
   - **Add your user to the `docker` group**:
     ```sh
     sudo usermod -aG docker ${USER}
     ```
   - **Log out and log back in** to apply the group changes.

### 3. **Transfer Your Docker Compose Files**
   - Use SCP (Secure Copy Protocol) or another method to transfer your Docker Compose files (`docker-compose.yml`, `.env`, etc.) to the EC2 instance:
     ```sh
     scp -i "your-key.pem" docker-compose.yml ubuntu@your-ec2-public-ip:~/
     ```

### 4. **Run Docker Compose**
   - SSH into your EC2 instance if you're not already connected.
   - Navigate to the directory where you transferred your `docker-compose.yml` file.
   - Run Docker Compose:
     ```sh
     docker-compose up -d
     ```

### 5. **Verify Deployment**
   - Check if your containers are running:
     ```sh
     docker ps
     ```
   - Access your application through the public IP of your EC2 instance. Ensure your security groups allow traffic on the necessary ports.

### 6. **Optional: Configure a Domain and SSL**
   - **Point your domain to the EC2 instance** by updating the DNS settings to point to the EC2 instance’s public IP.
   - **Set up SSL with Let’s Encrypt** using a reverse proxy like Nginx or Traefik in your Docker Compose setup.

### 7. **Manage and Scale**
   - **Monitor your containers** with `docker logs` and other Docker commands.
   - **Scale services** using `docker-compose scale` or by editing your `docker-compose.yml` file.

This approach gets your Docker Compose application up and running on AWS EC2. For production environments, consider additional practices like setting up a load balancer, auto-scaling, or using AWS ECS for managing containers.