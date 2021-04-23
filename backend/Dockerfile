FROM  node:14.15.4-alpine@sha256:2ae9624a39ce437e7f58931a5747fdc60224c6e40f8980db90728de58e22af7c

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./package-lock.json

RUN npm install

COPY . ./

EXPOSE 8001

CMD ["npm", "start"]
