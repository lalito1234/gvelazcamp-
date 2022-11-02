FROM node:lts-alpine

RUN npm install 

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist"]
