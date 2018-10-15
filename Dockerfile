FROM docker.io/node:8.12.0

WORKDIR /usr/local/src

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .

CMD node src/app.js
