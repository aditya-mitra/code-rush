# frontend

FROM node:alpine

ENV CRYPTO_SECRET=coderushgame%healthy
ENV PORT=3000

RUN mkdir -p /usr/app/frontend

LABEL at="coderush-frontend"

WORKDIR /usr/app/frontend

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run action-build

RUN ["rm", "frontend.env"]
RUN ["mv","frontend.local.env","frontend.env"]
RUN ["node", "decrypter.js"]

EXPOSE 3000

# last command for execution and exit
CMD ["npm", "start"]