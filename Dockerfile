FROM node:alpine

WORKDIR /usr/app

COPY ./backend .
RUN npm install


EXPOSE 3000

CMD [ "node", "index.js" ]