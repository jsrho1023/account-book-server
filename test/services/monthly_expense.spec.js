const MonthlyExpenseService = require('../../services/monthly_expense');
const moment = require('moment');
const assert = require('assert');

describe('monthly expense service should', () => {
  before(async ()=>{
    const mongoQuery = {
      findAll: function() {
        return {
          count: 0,
          sort: function() {
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
                return new Promise((resolve) => {
                  this.count++;
                  const datetime = '2019-02-0' + this.count;
                  resolve({ 'datetime': moment(datetime), 'consumption': {amount: 1000 * this.count, desc:'test'}});
                });                
              }
            }            
          }          
        }
      }
    }
    monthlyExpenseService = new MonthlyExpenseService(mongoQuery, moment);
  })

  it('retrieve any expense data of 1 month from specified date', async ()=>{
    const result = await monthlyExpenseService.getMonthlyExpense('2019-02-01');
    assert.notEqual(result, undefined);
    assert.equal(result['2019-02-01'], 1000);
    assert.equal(result['2019-02-02'], 2000);
    assert.equal(result['2019-02-03'], 3000);
    assert.equal(result['2019-02-04'], 4000);
    assert.equal(result['2019-02-20'], 0);
  })
})