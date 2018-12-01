const MongoConnector = require('../../mongodao/mongodb_connector');
const assert = require('assert');

describe('MongoClient should', () => {
    it('connect', async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';

        const connector = new MongoConnector(url);

        // Database Name
        let dbName = 'test';
        connector.initDatabase(dbName)
            .then((db) => {
                assert.equal(db.databaseName, dbName);
                connector.closeConnection();
            });

    }).timeout(15000);
});