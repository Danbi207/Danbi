FROM node:18.17.0-alpine
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
COPY ./ /usr/src/app/
EXPOSE 3478
CMD ["npm","run","start"]