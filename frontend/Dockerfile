# Step 1: Build the React app
FROM node:16 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx is serving the app on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
