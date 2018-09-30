const router = require('../../routers/index');
const sinon = require('sinon');
const assert = require('assert');
const controllers = require('../../routers/controllers');

describe('Router Test', function () {

  let app;

  before(function () {
    app = { get: sinon.spy(), post: sinon.spy() }
    router(app);
  })

  it('get /api/expense/day/:date is registered', function () {
    assert(app.get.calledWith('/api/expense/day/:date', controllers.expense.getDailyExpense));
  })

  it('post /api/expense/day/:date is registered', function () {
    assert(app.post.calledWith('/api/expense/day/:date', controllers.expense.addDailyExpense));
  })
  
})