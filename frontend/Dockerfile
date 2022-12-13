FROM node:18-alpine3.15

WORKDIR /usr/src/POS/frontend

COPY package*.json ./

RUN npm install -g npm@9.1.1
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]