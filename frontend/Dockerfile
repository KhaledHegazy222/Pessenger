FROM node:alpine as development

WORKDIR /app

COPY package* ./

RUN npm install

COPY ./ ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

FROM node:alpine as build

WORKDIR /app

COPY package* ./
COPY ./ ./

# RUN npm install

# RUN npm run build


FROM nginx:1.18-alpine as production

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]



