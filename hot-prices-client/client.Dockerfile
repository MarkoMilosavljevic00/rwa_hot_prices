FROM node:18-alpine3.14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start", "hot-prices-client" ]


# FROM node:16-alpine AS build
# WORKDIR /app

# COPY . .
# RUN npm install
# RUN npm run build hot-prices-client
# FROM nginx:alpine
# COPY --from=build /app/dist/apps/hot-prices-client/ /usr/share/nginx/html
# EXPOSE 80