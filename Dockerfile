# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM httpd:alpine

COPY --from=build /app/dist/stock/browser /usr/local/apache2/htdocs/
