const MonthlyExpenseService = require('../../services/monthly_expense');
const moment = require('moment');
const assert = require('assert');

describe('monthly expense service should', () => {
  before(async ()=>{
    const mongoQuery = {
      findAll: function() {
        return {
          count: 0,
          toArray: function(){
            return [];
          }
        }
      }
    }
    monthlyExpenseService = new MonthlyExpenseService(mongoQuery, moment);
  })

  it('retrieve any expense data of 1 month from specified date', async ()=>{
    const result = await monthlyExpenseService.getMonthlyExpense('2019-02-01');
    assert.notEqual(result, undefined);
  })
})