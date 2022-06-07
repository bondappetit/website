FROM node:16-alpine AS build

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/app/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/app/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 8080
