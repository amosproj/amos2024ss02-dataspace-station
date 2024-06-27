FROM node:22-alpine

USER root

RUN mkdir -p /amos/node_modules && chown -R node:node /amos

WORKDIR /amos

COPY --chown=node:node . .

ENV CONNECTOR_NAME=bank
ENV CLOUD_DOMAIN=amos.cloudness.dev
ENV RUNNING_ENV=local

RUN apk update
RUN apk add --no-cache curl jq

COPY frontend_socket/international-dataspace-station/package.json ./package.json
COPY frontend_socket/international-dataspace-station/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .

COPY --chown=node:node frontend_socket/international-dataspace-station/. .

RUN npm install --loglevel verbose

EXPOSE 3003

CMD [ "sh", "-c", "PORT=3003 npm run dev" ]