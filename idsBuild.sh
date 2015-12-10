#!/bin/bash
#
# This script is used to build the Docker container for the website
# using IBM DevOps Services (see https://hub.jazz.net for more info).
#

echo Setting up Docker...
mkdir dockercfg ; cd dockercfg
echo -e $KEY > key.pem
echo -e $CA_CERT > ca.pem
echo -e $CERT > cert.pem
cd ..
wget http://security.ubuntu.com/ubuntu/pool/main/a/apparmor/libapparmor1_2.8.95~2430-0ubuntu5.3_amd64.deb -O libapparmor.deb
sudo dpkg -i libapparmor.deb
rm libapparmor.deb
wget https://get.docker.com/builds/Linux/x86_64/docker-1.9.1 --quiet -O docker
chmod +x docker

./docker build -t obc-website .
./docker stop -t 0 obc-website || true
./docker rm obc-website || true
./docker run -p 10.108.46.87:8080:80 -e MONGO_URI=$MONGO_URI -d --name=obc-website obc-website


rm docker
rm -rf dockercfg