const router = require('../../routers/index');
const sinon = require('sinon');
const assert = require('assert');
const controllers = require('../../routers/expense_controller');

describe('Router Test', function () {

  let app;

  before(function () {
    app = { get: sinon.spy(), post: sinon.spy() }
    mockExpenseController = {
      getDailyExpense: function(){},
      saveDailyExpense: function(){},
    }
    router(app, mockExpenseController);
  })

  it('get /api/expense/day/:date is registered', function () {
    assert(app.get.calledWith('/api/expense/day/:date', mockExpenseController.getDailyExpense));
  })

  it('post /api/expense/day/:date is registered', function () {
    assert(app.post.calledWith('/api/expense/day/:date', mockExpenseController.saveDailyExpense));
  })
  
})