FROM docker.io/node:8.12.0 AS build
WORKDIR /usr/local/src
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .

FROM docker.io/node:8.12.0-alpine
WORKDIR /usr/local/src
COPY --from=build /usr/local/src .
CMD node src/main.js

