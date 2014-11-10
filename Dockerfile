FROM ubuntu

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y nodejs
RUN ln -sf /usr/bin/nodejs /usr/local/bin/node

RUN apt-get install -y npm

EXPOSE 9002

COPY dist /usr/sbin/thedebate-web/dist

WORKDIR /usr/sbin/thedebate-web
CMD node dist/server.js 
