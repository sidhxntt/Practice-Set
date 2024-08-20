>> All these commands can either be written as bootstrap script (bash script) or done maunually, bootstrap script is recommended for auto scaling purpose.
## Application Server Deployment on EC2
1. Create VPC using latest VPC and more builder which will include your vpc, subnets (2 public and 2 private in different AZs), interent gateway, S3 endpoint, NAT Gateway etc.
2. Create an EC2 instance in private subnet with ubunutu AMI.
3. Connect it using private endpoint which you have to make to connect to private instances. Once connected follow these commands
1. `sudo apt update`
2. `sudo apt upgrade`
3. `sudo apt-get install unzip`
4. `curl -fsSL https://bun.sh/install | bash`
5. `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
6. `sudo apt-get install -y nodejs`
7. `mkdir app-server`
8. `cd app-server`
9. `git clone <your directory>`
10. `<move only backend part to app-server directory>`
11. `sudo npm install`
12. `sudo npm i -g pm2`
13. `pm2 start src/server.ts --name "my-app" --interpreter ts-node --env production`

## Web Server Deployment on EC2
2. Create an EC2 instance in public subnet with ubunutu AMI.
3. Connect it using instant connect or ssh endpoint. Once connected follow these commands.

1. `sudo apt update`
2. `sudo apt upgrade`
3. `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
4. `sudo apt-get install -y nodejs`
5. `mkdir web-server`
6. `cd web-server`
7. `git clone <your directory>`
8. `<move only frontend part to web-server directory>`
9. `sudo npm install`
10. `sudo npm i -g pm2`
11. `sudo apt install nginx`
12. `cd /etc/nginx`
13. `sudo vim nginx.conf`
14. Edit the config file with (if using nextjs use nginx as reverse proxy and if vitejs then as webserver):
    ```nginx
    server {
      listen 80;

      server_name your-domain.com; # Replace with your domain or public IP

      location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }

      location /static/ {
        alias /path/to/your/static/files/;
      }
    }
    ```
15. `sudo nginx -t`
16. `sudo systemctl restart nginx`
17. `pm2 start node_modules/.bin/next --name "nextjs-app" -- start`


>> you can always use certbot for SSL certificate