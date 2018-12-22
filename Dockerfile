# Setup and build the client
FROM node:8 as client

WORKDIR /app/client
COPY client/package.json /app/client
RUN yarn install
COPY client/ /app/client
RUN yarn build


# Setup the server
FROM node:8

WORKDIR /app
COPY --from=client /app/client/build/ ./client/build/

WORKDIR /app/server
COPY server/package.json ./
RUN yarn global add nodemon
RUN yarn install
COPY server/ ./

EXPOSE 5000

CMD [ "yarn", "server"]
