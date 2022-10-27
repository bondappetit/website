FROM node:12-alpine AS build

WORKDIR /app

ARG REACT_APP_UNISENDER_API
ARG REACT_APP_INFURA_API_KEY
ARG REACT_APP_PORTIS_ID
ARG REACT_APP_FORTMATIC_KEY
ARG REACT_APP_SENTRY
ARG REACT_APP_TREZOR_URL
ARG REACT_APP_TREZOR_EMAIL
ARG REACT_APP_IMPROPERLY_PROPOSALS
ARG REACT_APP_WISE_WOLVES_PUBLIC_KEY
ARG REACT_APP_SWOP_URL
ARG REACT_APP_WAVES_URL

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL:-https://cache.bondappetit.io/api }
ARG REACT_APP_DEFAULT_CHAIN_ID
ENV REACT_APP_DEFAULT_CHAIN_ID ${REACT_APP_DEFAULT_CHAIN_ID:-1}

RUN apk --update add python3 build-base git
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run typechain
RUN npm run build


FROM nginx:stable-alpine
WORKDIR /app
COPY deployments/dockerfiles/ba-website/default.conf /etc/nginx/conf.d/default.conf
COPY deployments/dockerfiles/ba-website/prerenderer.conf /etc/nginx/prerenderer.conf
COPY deployments/dockerfiles/ba-website/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .

EXPOSE 8080
