# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy application source code and build for production
COPY . .
RUN npm run build

# Stage 2: Production stage using lightweight Nginx server
FROM nginx:alpine

# Copy static built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for React SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
