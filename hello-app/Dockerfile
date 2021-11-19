FROM node:12.16.3-alpine as build

WORKDIR /app

COPY . ./build

# ---
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default ngingx static assets
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
