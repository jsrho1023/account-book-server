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
      findAll: function () {
        return {
          count: 0,
          hasNext: function(){
            if(this.count < 4){
              return true;
            }
            else{
              return false;
            }
          },
          next: function(){
            this.count++;
            return { 'datetime': date, 'consumption': {amount: 1000, desc:'test'} }
          }
        }
      },

      insertMany: function () {
        return new Promise((resolve) => {
          resolve({ insertedCount: 2 });
        })
      },

      deleteMany: function () {
        return new Promise((resolve) => {
          resolve({ deletedCount: 2 });
        })
      }
    }
    dailyExpenseService = new DailyExpenseService(mongoQuery);
  })

  it('add daily expense of specified date', async () => {
    await dailyExpenseService.saveDailyExpense(date, [{ 'amount': 1000, 'desc': 'test1' },{ 'amount': 2000, 'desc': 'test2' }])
      .then(
        (result) => {
          assert.equal(result.insertedCount, 2);
        }
      )
  })

  it('get daily expense of specified date', async () => {
    const document = await dailyExpenseService.getExpense(date);
    assert.equal(document.consumptions.length, 4);
  })

  it('delete expense date of specified date', async () => {
    await dailyExpenseService.deleteExpense(date)
      .then(
        (result) => {
          assert.equal(result.deletedCount, 2);
        }
      )
  })
})