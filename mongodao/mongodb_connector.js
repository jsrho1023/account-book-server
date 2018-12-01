const MongoClient = require('mongodb').MongoClient;

class MongoConnector {
    constructor(url) {
        this.url = url;
    }

    initDatabase(dbName) {
        return MongoClient.connect(this.url, { useNewUrlParser: true })
            .then((client) => {
                this.mongoClient = client;                
                return this.mongoClient.db(dbName);
            })
            .catch((reason) => {
                console.error("failed to connect mongod:" + reason)
            });
    }

    closeConnection() {
        return this.mongoClient.close(true);
    }
}

module.exports = MongoConnector;