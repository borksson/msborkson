FROM mongo:latest

# ENV MONGO_INITDB_ROOT_USERNAME=
# ENV MONGO_INITDB_ROOT_PASSWORD=

WORKDIR /data/dump

COPY ./dump/ /data/dump/

COPY ./restore.sh /docker-entrypoint-initdb.d/restore.sh

RUN chmod +x /docker-entrypoint-initdb.d/restore.sh
