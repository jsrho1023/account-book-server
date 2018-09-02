const MongoClient = require('mongodb').MongoClient;

let mongoConnector = {};
let mongoClient;

mongoConnector.initDatabase = async function (url, dbName) {
    let database = await MongoClient.connect(url)
        .then((client) => {
            mongoClient = client;
            return client.db(dbName);
        })
        .catch((reason) => {
            console.error("failed to connect mongod:" + reason)
        });

    return database;
}

mongoConnector.closeConnection = function () {
    mongoClient.close();
}

module.exports = mongoConnector;