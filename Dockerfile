FROM node:9.11.2-alpine

RUN apk add --update --no-cache git python build-base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "bin/www" ]