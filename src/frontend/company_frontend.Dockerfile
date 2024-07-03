FROM node:22-alpine

WORKDIR /amos

COPY --chown=node:node . .

COPY app/participants/company ./app/
COPY data/participants/company ./data/

ARG RUNNING_ENV=local
ENV RUNNING_ENV=${RUNNING_ENV}

ENV CONNECTOR_NAME=company
ENV CLOUD_DOMAIN=amos.cloudness.dev

RUN apk update
RUN apk add --no-cache curl jq

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev
