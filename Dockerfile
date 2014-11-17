FROM ubuntu

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN ln -sf /usr/bin/nodejs /usr/local/bin/node

RUN apt-get install -y npm

EXPOSE 9002

COPY . /tmp/the-debate
WORKDIR /tmp/the-debate
RUN npm install -g bower gulp
RUN npm install
RUN bower install --allow-root
RUN gulp
RUN mkdir /usr/sbin/thedebate-web
RUN cp -r /tmp/the-debate/dist /usr/sbin/thedebate-web

WORKDIR /usr/sbin/thedebate-web
CMD node dist/server.js 
