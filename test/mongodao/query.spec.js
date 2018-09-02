const connector = require('../../mongodao/mongodb_connector');
const query = require('../../mongodao/mongodb_query');
const assert = require('assert');

describe('MongoClient should', () => {
    let mongodb;

    before(async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';
        // Database Name
        let dbName = 'test';

        mongodb = await connector.initDatabase(url, dbName);
    })

    it('insert test data', () => {
        let dateObject = new Date();
        let date = [
            dateObject.getFullYear(),
            (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
            (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');;

        query.insertOne(mongodb, 'daily-expense', { "datetime": date, "consumptions": [{ "amount": 1000, "desc": "stop wasting" }, { "amount": 2000, "desc": "I know you did" }] })
            .then((result) => {
                assert.equal(result.insertedCount, 1);
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve all data', () => {
        query.retrieveAll(mongodb, 'daily_expense')
            .then((items) => {
                assert.notEqual(items, null);
            })
            .catch((error) => {
                assert.fail(error);
            })
    }).timeout(15000);

    it('remove test data', () => {
        let dateObject = new Date();
        let date = [
            dateObject.getFullYear(),
            (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
            (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');;

        query.deleteOne(mongodb, 'daily-expense', { "datetime": date })
            .then((result) => {
                assert.equal(result.deletedCount, 1);
            })
            .catch((error) => {
                assert.fail(error);
            })
    }).timeout(15000);

    after(() => {
        connector.closeConnection();
    })
});