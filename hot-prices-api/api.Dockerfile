FROM node:18-alpine3.14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start", "hot-prices-api" ]
# RUN npm run build hot-prices-api
# CMD [ "node", "dist/apps/hot-prices-api" ]