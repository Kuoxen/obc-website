FROM    node:0.12

MAINTAINER Ben Smith (benjsmi@us.ibm.com)

RUN mkdir -p /opt/obc ; apt-get update ; apt-get install -y mongodb-dev
COPY . /opt/obc/

RUN echo "Installing Node modules..." ; cd /opt/obc ; npm update npm ; npm install --unsafe-perm

COPY ./startup.sh /opt/startup.sh

EXPOSE 3000

CMD ["/opt/startup.sh"]