FROM node:14-alpine AS build

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

ARG REACT_APP_DEFAULT_CHAIN_ID
ENV REACT_APP_DEFAULT_CHAIN_ID ${REACT_APP_DEFAULT_CHAIN_ID:-1}

RUN apk --update add git
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run typechain

FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/app/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/app/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 8080
