#!/bin/bash

docker run -d \
  -p 27071:27017/tcp \
  --name memeno-mongo \
  -v "$(pwd)"/db:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=memeno \
  -e MONGO_INITDB_ROOT_PASSWORD=mysecretpassword \
  mongo:latest