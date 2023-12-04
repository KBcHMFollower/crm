FROM node

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client .

CMD ["npm", "run", "start-client"]