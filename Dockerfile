FROM node:14

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ./server .

RUN npm install -g ts-node
RUN npm install -g typescript
RUN npm install

RUN mkdir public

COPY ./client-development ./client-development

RUN cd client-development && \
    npm install && \
    npm run build && \
    mv build ../public

EXPOSE 8123

CMD ["npm", "start"]