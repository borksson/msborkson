#!/bin/bash

set -e

# Wait for the MongoDB service to be available
# until mongosh --host localhost --eval "print(\"waited for connection\")"
# do
#     sleep 2
# done

# Create a new user with the provided credentials
# mongosh admin <<EOF
# db.createUser({
#   user: "$MONGO_INITDB_ROOT_USERNAME",
#   pwd: "$MONGO_INITDB_ROOT_PASSWORD",
#   roles: [{ role: "root", db: "admin" }]
# })
# EOF
# mongosh blog <<EOF
# db.createUser({
#   user: "$MONGO_INITDB_ROOT_USERNAME",
#   pwd: "$MONGO_INITDB_ROOT_PASSWORD",
#   roles: ["dbOwner"]
# })
# EOF

# # Restore the database from the dump files
# mongorestore --host localhost --authenticationDatabase admin --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --db blog /data/dump/blog

