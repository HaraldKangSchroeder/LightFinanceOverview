FROM node:latest

WORKDIR /usr/src/app

COPY ./server .

RUN npm install

RUN mkdir public

COPY ./client-development ./client-development

RUN cd client-development && \
    npm install && \
    npm run build && \
    mv build ../public

EXPOSE 8123

CMD ["npm", "start"]