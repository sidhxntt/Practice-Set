FROM node:22.5-alpine3.19

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
 
EXPOSE 4000

CMD ["yarn", "dev"]