const connector = require('../../mongodao/mongodb_connector');
const assert = require('assert');

describe('MongoClient should', () => {
    it('connect', () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';

        // Database Name
        let dbName = 'account-book';

        return connector.initDatabase(url, dbName).then((db)=>{
            assert.equal(db.databaseName, dbName);
            connector.closeConnection();
        }).catch((reason)=>{
            assert.fail();
        })
    }).timeout(15000);
});