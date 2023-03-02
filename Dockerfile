FROM node:12.22.9

WORKDIR /usr/src/bot_ggsheet
COPY package*.json ./

RUN npm install

#Copy all files and directories located where the Dockerfile is placed into the workdir.
COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]