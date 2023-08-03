FROM node:18.17.0-alpine
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
RUN npm run build
COPY ./ /usr/src/app/
EXPOSE 3000
CMD ["npm","run","start"]