FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci

COPY backend/src ./src
COPY backend/datos.db ./

EXPOSE 3000

CMD ["npm", "start"]
