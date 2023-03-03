FROM node:18.14.2

WORKDIR /usr/src/bot_ggsheet
COPY package*.json ./

COPY . .

RUN npm install

#Copy all files and directories located where the Dockerfile is placed into the workdir.


EXPOSE 8080

CMD [ "npm", "start" ]