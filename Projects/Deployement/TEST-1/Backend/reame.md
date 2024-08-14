## Application server deployment on ec2 
1. `sudo apt update`

2. `sudo apt upgrade`
3. `sudo apt-get install unzip`
3. `curl -fsSL https://bun.sh/install | bash`

4. `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs`

5. `mkdir app-server`
6. `cd app-server`
7. `git clone <your directory>`
8. `<make to move only backend part to app-server directory`
9. `sudo npm install`
10. `sudo npm i -g pm2`
11. `pm2 start src/server.ts --name "my-app" --interpreter ts-node --env production`

