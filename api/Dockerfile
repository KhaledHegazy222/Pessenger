FROM node:alpine as development

WORKDIR /app

COPY package* ./

RUN npm install

COPY ./ ./

EXPOSE 8000

CMD ["npm", "start"]