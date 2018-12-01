const DailyExpenseService = require('../../services/daily_expense');
const assert = require('assert');

describe('dailyExpenseService service shoud', () => {
  let date;
  let dailyExpenseService;

  before(async () => {
    const dateObject = new Date();
    date = [
      dateObject.getFullYear(),
      (dateObject.getMonth() + 1 > 9 ? '' : '0') + (dateObject.getMonth() + 1),
      (dateObject.getDate() > 9 ? '' : '0') + dateObject.getDate()].join('-');

    const mongoQuery = {
      findOneDoc: function () {
        return new Promise((resolve) => {
          resolve({ 'datetime': date, 'consumptions': [{ 'amount': 1000, 'desc': 'test1' }, { 'amount': 2000, 'desc': 'test2' }] });
        })
      },

      insertOne: function () {
        return new Promise((resolve) => {
          resolve({ insertedCount: 1 });
        })
      },

      deleteOne: function () {
        return new Promise((resolve) => {
          resolve({ deletedCount: 1 });
        })
      }
    }
    dailyExpenseService = new DailyExpenseService(mongoQuery);
  })

  it('add daily expense of specified date', async () => {
    await dailyExpenseService.addDailyExpense(date, [{ 'amount': 1000, 'desc': 'test' }])
      .then(
        (result) => {
          assert.equal(result.insertedCount, 1);
        }
      )
  })

  it('get daily expense of specified date', async () => {
    const document = await dailyExpenseService.getExpense(date);
    assert.equal(document.consumptions.length, 2);
  })

  it('delete expense date of specified date', async () => {
    await dailyExpenseService.deleteExpense(date)
      .then(
        (result) => {
          assert.equal(result.deletedCount, 1);
        }
      )
  })
})