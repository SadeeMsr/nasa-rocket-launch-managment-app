FROM node:lts-alpine

WORKDIR /app

COPY . .

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY client/package*.json client/
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000