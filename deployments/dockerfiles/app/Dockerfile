FROM node:16-alpine AS build

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL:-https://cache.bondappetit.io/api }
ARG REACT_APP_DEFAULT_CHAIN_ID
ENV REACT_APP_DEFAULT_CHAIN_ID ${REACT_APP_DEFAULT_CHAIN_ID:-1}

RUN apk --update add python3 build-base git
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run typechain
RUN npm run build


FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/app/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/app/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .

EXPOSE 8080
