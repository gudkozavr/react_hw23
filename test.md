docker run -d --name mongo-demo \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
-e MONGO_INITDB_ROOT_PASSWORD=test123 \
-p 27017:27017 -v mongodemo:/data/db \
mongo

mongodb://mongoadmin:test123@localhost:27017/
