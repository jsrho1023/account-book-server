const connector = require('../../mongodao/mongodb_connector');
const MongoQuery = require('../../mongodao/mongodb_query');
const assert = require('assert');

describe('query should', () => {
    let mongoQuery;
    let date;

    before(async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';
        // Database Name
        let dbName = 'test';

        const mongodb = await connector.initDatabase(url, dbName);

        if(!mongodb) {
            assert.fail();
        }

        mongoQuery = new MongoQuery(mongodb);

        const dateObject = new Date();
        date = [
            dateObject.getFullYear(),
            (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
            (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');
    })

    it('insert test data', async () => {
        await mongoQuery.insertOne('test', 
                { 'datetime': date, 
                  'consumptions': [
                      { 'amount': 1000, 'desc': 'stop wasting' }, 
                      { 'amount': 2000, 'desc': 'I know you did' }] })
            .then((result) => {
                assert.equal(result.insertedCount, 1);
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve one data (inserted one)', async () => {
        await mongoQuery.findOneDoc('test', { 'datetime': date })
            .then((doc) => {
                assert.equal(doc.consumptions.length, 2)
            })
            .catch((error)=>{
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve one data (no data)', async () => {
        await mongoQuery.findOneDoc('test', { 'datetime': '2018-01-01' })
            .then((doc) => {
                assert.equal(doc, null)
            })
            .catch((error)=>{
                assert.fail(error);
            });
    }).timeout(15000);

    it('remove test data', async () => {
        await mongoQuery.deleteOne('test', { "datetime": date })
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