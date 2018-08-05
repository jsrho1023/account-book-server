const MongoClient = require('mongodb').MongoClient;

let mongoConnector = {};
let mongoClient;

mongoConnector.initDatabase = async function(url, dbName) {
    let database = await MongoClient.connect(url)
        .then((client) => {
            console.log("Connected successfully to " + dbName);
            mongoClient = client;
            return client.db(dbName);
        })
        .catch((reason) => {
            console.log("Failed to connect mongod")
        });

    return database;
}

mongoConnector.closeConnection = function(){
    mongoClient.close();
}

module.exports = mongoConnector;