const dailyExpenseService = require('../../services/daily_expense');
const mongoConnector = require('../../mongodao/mongodb_connector');
const assert = require('assert');

describe('dailyExpenseService service shoud', () => {
  let date;
  let db;

  before(async () => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'test';

    db = await mongoConnector.initDatabase(url, dbName);
    if(!db){
      assert.fail();
    }
  })

  it('add daily expense of specified date', async () => {
    const dateObject = new Date();
    date = [
      dateObject.getFullYear(),
      (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
      (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');

    await dailyExpenseService.addDailyExpense(db, date, { 'amount': 1000, 'desc': 'test' }).then(
      (result) => {
        assert.equal(result.insertedCount, 1);
      }
    )
  })

  it('get daily expense of specified date', async () => {
    const document = await dailyExpenseService.getExpense(db, date);
    assert.equal(document.consumptions.length, 1);
  })

  after(() => {
    mongoConnector.closeConnection();
  })
})