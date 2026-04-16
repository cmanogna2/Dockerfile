# 1. Base image
# Dockerfile for backend containerization
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy remaining code
COPY . .

# 6. Expose port
EXPOSE 5000

# 7. Start server
CMD ["node", "server.js"]