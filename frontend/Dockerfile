FROM node:alpine as development

WORKDIR /app

COPY package* ./

RUN npm install

COPY ./ ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

