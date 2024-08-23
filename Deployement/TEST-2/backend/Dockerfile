# Backend Dockerfile
FROM node:22.5-alpine3.19

# Set working directory
WORKDIR /app/backend

# Install dependencies
COPY package.json yarn.lock ./
RUN npm install

# Copy application files
COPY . . 

# Expose port
EXPOSE 4000

RUN rm -rf node_modules
RUN npm install
# Start the Express.js application
CMD ["yarn", "dev"]
