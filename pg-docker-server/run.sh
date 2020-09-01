#!/bin/bash

docker run -d \
  -p 5432:5432/tcp \
  --name memeno-postgres \
  -v "$(pwd)"/db:/var/lib/postgresql/data \
  -v "$(pwd)"/logs:/var/lib/postgresql/logs \
  -v "$(pwd)"/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d \
  -e POSTGRES_INITDB_WALDIR=/var/lib/postgresql/logs \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=memeno \
  postgres:13