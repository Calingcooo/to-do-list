FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN node ace db:seed

RUN node ace build --production

EXPOSE 3333

CMD ["node", "build/server.js"]
