FROM node:8

RUN mkdir -p /app/client
WORKDIR /app/client
COPY package.json /app/client
RUN yarn install

COPY . /app/client
EXPOSE 3000
CMD [ "yarn", "start"]
