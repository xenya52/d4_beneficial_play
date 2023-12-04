FROM node:18.18.2-bullseye

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
RUN npm i
RUN chown -R node:node /home/node/app
USER node
COPY --chown=node:node . .

CMD [ "npm","start" ]