FROM node:16.13
WORKDIR /usr/src/app
COPY ./package.json .
RUN npm install
COPY . /usr/src/app
RUN npm run build --force
EXPOSE 3000
CMD npm start