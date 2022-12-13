FROM node:18-alpine3.15

WORKDIR /usr/src/POS/backend

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install -g npm@9.1.1
RUN npm install && npm cache clean --force

COPY . .

# RUN npm run build

EXPOSE 4000

CMD [ "npm", "run","dev" ]
