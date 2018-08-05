const connector = require('../../mongodao/mongodb_connector');
const retrieve = require('../../mongodao/mongodb_retrieve');
const assert = require('assert');

describe('MongoClient should', () => {
    it('retrieve all data', () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';

        // Database Name
        let dbName = 'account-book';

        return connector.initDatabase(url, dbName).then((db) => {
            retrieve.retrieveAll(db, 'daily_expense')
                .then((items) => {
                    assert.notEqual(items, null);
                })
                .catch((error) => {
                    assert.fail();
                })
            connector.closeConnection();
        }).catch((reason) => {
            assert.fail();
        })
    }).timeout(15000);
});