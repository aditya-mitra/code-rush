# backend

FROM node:alpine

ENV CRYPTO_SECRET=coderushgame%healthy
ENV PORT=9000

RUN mkdir -p /usr/app/backend

LABEL at="coderush-backend"

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

EXPOSE 9000

CMD ["npm", "start"]