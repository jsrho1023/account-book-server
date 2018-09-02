const connector = require('../../mongodao/mongodb_connector');
const assert = require('assert');

describe('MongoClient should', () => {
    it('connect', async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';

        // Database Name
        let dbName = 'account-book';

        let db = await connector.initDatabase(url, dbName)
        assert.equal(db.databaseName, dbName);
        connector.closeConnection();
    }).timeout(15000);
});