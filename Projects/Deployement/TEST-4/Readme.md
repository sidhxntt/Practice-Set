# Heroku
Deploying a full-stack app (Next.js frontend and Express backend) on Heroku involves a few steps. Here’s a guide to get you started:

### 1. **Prepare Your Project**
   Ensure your project is structured properly for deployment:
   - **Frontend (Next.js)** should be in a folder, e.g., `client/`.
   - **Backend (Express)** should be in a folder, e.g., `server/`.
   - The root directory should have a `Dockerfile` and optionally a `docker-compose.yml` file.

### 2. **Dockerize Your Application**
   Since your app is already containerized, you likely have a `Dockerfile`. Here's a basic example structure:

   **Dockerfile (for full-stack app):**
   ```dockerfile
   # Backend
   FROM node:18-alpine AS server
   WORKDIR /app/server
   COPY ./server/package*.json ./
   RUN npm install
   COPY ./server ./
   
   # Frontend
   FROM node:18-alpine AS client
   WORKDIR /app/client
   COPY ./client/package*.json ./
   RUN npm install
   COPY ./client ./
   RUN npm run build

   # Final Stage
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=server /app/server /app/server
   COPY --from=client /app/client /app/client
   WORKDIR /app/server
   CMD ["node", "index.js"]
   ```

   **docker-compose.yml (optional):**
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
   ```

### 3. **Create a Heroku App**
   If you haven’t already, create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

### 4. **Add Docker Support on Heroku**
   Enable Docker support for Heroku by using the following commands:
   ```bash
   heroku stack:set container
   ```

### 5. **Deploy to Heroku**
   Once your Dockerfile is set up correctly and you've created the Heroku app, you can deploy by pushing your code to Heroku:

   ```bash
   git add .
   git commit -m "Deploying to Heroku"
   git push heroku main
   ```

   If your main branch is not named `main`, replace it with the correct branch name.

### 6. **Set Environment Variables (if needed)**
   If your application relies on environment variables, set them on Heroku:
   ```bash
   heroku config:set KEY_NAME=value
   ```

### 7. **View Logs**
   To monitor your app:
   ```bash
   heroku logs --tail
   ```

### 8. **Access Your Application**
   After deployment, your app should be accessible at `https://your-app-name.herokuapp.com`.

### 9. **Connect a Database (Optional)**
   If your backend requires a database (like PostgreSQL), you can add a Heroku addon:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```
   Heroku will automatically set the database environment variables for you.

### 10. **Scaling Your App (Optional)**
   If you need to scale your app (add more dynos):
   ```bash
   heroku ps:scale web=1
   ```

### Troubleshooting Tips:
- If you encounter issues, check your Dockerfile for errors or incompatibilities.
- Make sure all necessary environment variables are set on Heroku.
- Review logs to diagnose issues.

This setup should deploy your full-stack app on Heroku using Docker.