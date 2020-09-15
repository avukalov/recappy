FROM node:13.12.0-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i

EXPOSE 3001
CMD ["npm", "run", "start"]