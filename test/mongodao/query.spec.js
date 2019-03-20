const MongoConnector = require('../../mongodao/mongodb_connector');
const MongoQuery = require('../../mongodao/mongodb_query');
const assert = require('assert');

describe('query should', () => {
    let connector;
    let mongoQuery;
    let date;

    before(async () => {
        // Connection URL
        let url = 'mongodb://localhost:27017';
        // Database Name
        let dbName = 'test';

        connector = new MongoConnector(url);
        await connector.initDatabase(dbName)
            .then((db) => {
                if (!db) {
                    assert.fail();
                }
                mongoQuery = new MongoQuery(db);
            });

        const dateObject = new Date();
        date = [
            dateObject.getFullYear(),
            (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
            (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');
    })

    it('insert one test data', async () => {
        await mongoQuery.insertOne('test',
            {
                'datetime': date,
                'consumption': { 'amount': 1000, 'desc': 'stop wasting' }
            })
            .then((result) => {
                assert.equal(result.insertedCount, 1);
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('insert three more test data', async () => {
        await mongoQuery.insertMany('test', [
            {
                'datetime': date,
                'consumption': { 'amount': 2000, 'desc': 'I know you will' }
            },
            {
                'datetime': date,
                'consumption': { 'amount': 3000, 'desc': 'again?' }
            },
            {
                'datetime': date,
                'consumption': { 'amount': 1000, 'desc': 'good enough' }
            },
        ])
            .then((result) => {
                assert.equal(result.insertedCount, 3);
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve all data', async () => {
        const cursor = mongoQuery.findAll('test', { 'datetime': date });
        cursor.count()
            .then(
                (count) => {
                    assert.equal(count, 4);
                }
            ).catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve one data (inserted one)', async () => {
        await mongoQuery.findOneDoc('test', { 'datetime': date })
            .then((doc) => {
                assert.equal(doc.consumption.amount, 1000);
                assert.equal(doc.consumption.desc, 'stop wasting')
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('retrieve one data (no data)', async () => {
        await mongoQuery.findOneDoc('test', { 'datetime': '2018-01-01' })
            .then((doc) => {
                assert.equal(doc, null)
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    it('remove test data', async () => {
        await mongoQuery.deleteAll('test', { "datetime": date })
            .then((result) => {
                assert.equal(result.deletedCount, 4);
            })
            .catch((error) => {
                assert.fail(error);
            });
    }).timeout(15000);

    after(() => {
        connector.closeConnection();
    })
});