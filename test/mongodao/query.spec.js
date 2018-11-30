const connector = require('../../mongodao/mongodb_connector');
const query = require('../../mongodao/mongodb_query');
const assert = require('assert');

describe('query should', () => {
    let mongodb;
    let date

    before(async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';
        // Database Name
        let dbName = 'test';

        mongodb = await connector.initDatabase(url, dbName);

        if(!mongodb) {
            assert.fail();
        }

        const dateObject = new Date();
        date = [
            dateObject.getFullYear(),
            (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
            (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');
    })

    it('insert test data', async () => {
        await query.insertOne(mongodb, 'test', 
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

    it('retrieve all data', async () => {
        await query.retrieveAll(mongodb, 'test')
            .then((items) => {
                assert.notEqual(items, null);
            })
            .catch((error) => {
                assert.fail(error);
            })
    }).timeout(15000);

    it('retrieve one data (inserted one)', async () => {
        await query.findOneDoc(mongodb, 'test', { 'datetime': date })
            .then((doc) => {
                assert.equal(doc.consumptions.length, 2)
            })
            .catch((error)=>{
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve one data (no data)', async () => {
        await query.findOneDoc(mongodb, 'test', { 'datetime': '2018-01-01' })
            .then((doc) => {
                assert.equal(doc, null)
            })
            .catch((error)=>{
                assert.fail(error);
            });
    }).timeout(15000);

    it('remove test data', async () => {
        await query.deleteOne(mongodb, 'test', { "datetime": date })
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