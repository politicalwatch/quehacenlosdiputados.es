# build stage
FROM node:16.20.2-alpine as build-stage

RUN apk update && apk add git

WORKDIR /app
COPY package.json ./
RUN yarn install --ignore-engines
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
