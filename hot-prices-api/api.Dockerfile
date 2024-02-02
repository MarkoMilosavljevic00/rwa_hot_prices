FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
COPY . .
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "run", "start", "hot-prices-api" ]
# RUN npm run build hot-prices-api
# CMD [ "node", "dist/apps/hot-prices-api" ]