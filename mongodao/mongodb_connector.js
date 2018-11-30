const MongoClient = require('mongodb').MongoClient;

let mongoConnector = {};
let mongoClient;

mongoConnector.initDatabase = async function (url, dbName) {
    const database = await MongoClient.connect(url, { useNewUrlParser: true })
        .then((client) => {
            mongoClient = client;
            return client.db(dbName);
        })
        .catch((reason) => {
            console.error("failed to connect mongod:" + reason)
            return null; 
        });

    return database;
}

mongoConnector.closeConnection = function () {
    mongoClient.close(true);
}

module.exports = mongoConnector;