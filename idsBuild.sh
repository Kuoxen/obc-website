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

echo Building the OBC Website...
./docker build -t obc-website .
echo Stopping the existing container...
./docker stop -t 0 obc-website || true
echo Removing the existing container...
./docker rm obc-website || true
echo Stopping the associated mongo container...
./docker stop -t 0 obc-mongo || true
echo Removing the associated mongo container...
./docker rm obc-mongo || true
echo Starting a new mongo container...
./docker run -d --name=obc-mongo mongo
echo Starting the OBC Website container linked to the mongodb container...
./docker run -p 34000:80 --link obc-mongo:obc-mongo -e MONGO_URI=mongodb://obc-mongo:27017 -d --name=obc-website obc-website


rm docker
rm -rf dockercfg