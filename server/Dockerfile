FROM node:8

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server
RUN yarn global add nodemon
RUN yarn install

COPY . /app/server

CMD [ "yarn", "server:dev"]
