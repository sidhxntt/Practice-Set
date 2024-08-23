# Frontend Dockerfile
FROM node:22.5-alpine3.19

# Set working directory
WORKDIR /app/frontend

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
