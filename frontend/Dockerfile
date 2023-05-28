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

RUN npm install --prefer-offline

RUN npm run build


FROM nginx:1.18-alpine as production

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /frontend/build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


