#!/bin/bash

docker run -d \
  -p 127.0.0.1:5432:5432/tcp \
  --name memeno-postgres \
  -v "$(pwd)"/db:/var/lib/postgresql/data \
  -v "$(pwd)"/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=memeno \
  postgres:13