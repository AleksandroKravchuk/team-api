FROM node:16.15.1-alpine
WORKDIR /server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD npm start