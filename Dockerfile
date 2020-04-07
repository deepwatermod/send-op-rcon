FROM mhart/alpine-node:latest
WORKDIR /usr/server

# environment

ENV port=3398


COPY server/package*.json ./

RUN npm install

COPY server/src ./src

EXPOSE ${port}

CMD ["npm", "start"]
