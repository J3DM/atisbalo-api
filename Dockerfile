FROM node:12.16.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "./api/server.js" ]