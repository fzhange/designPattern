FROM node:latest

WORKDIR /app

COPY ./index.html .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]