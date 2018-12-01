const sinon = require('sinon');
const http_mocks = require('node-mocks-http');
const should = require('should');
const ExpenseController = require('../../routers/expense_controller');

function buildResponse() {
  return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Controller Test', function () {
  let mockDailyExpense;
  before(()=>{
    mockDailyExpense = {
      getExpense: function(){},
      addDailyExpense: function(){}
    }    
  })

  it('when getDailyExpense called, should call getExpense and return data', function (done) {

    let getExpenseStub = sinon.stub(mockDailyExpense, 'getExpense').returns({
      "datetime": "2018-09-01",
      "consumptions": [
        { "amount": 1000, "desc": "stop wasting" },
        { "amount": 2000, "desc": "i knew" }
      ]
    });
    let response = buildResponse()
    let request = http_mocks.createRequest({
      method: 'GET',
      url: '/api/expense/day/20180901',
    });
    response.on('end', function () {
      should(response._isJSON()).be.exactly(true);

      data = JSON.parse(response._getData());

      should.equal(data.datetime, "2018-09-01");
      should.equal(data.consumptions[0].amount, 1000);
      should.equal(data.consumptions[1].amount, 2000);
      should.equal(data.consumptions[0].desc, "stop wasting");
      should.equal(data.consumptions[1].desc, "i knew");

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense);
    expenseController.getDailyExpense(request, response);

    getExpenseStub.calledOnceWithExactly('20180901');
    getExpenseStub.restore();
  })

  it('given DB write success, when addDailyExpense called, should call addDailyExpense and return result', function () {
    let addDailyExpenseStub = sinon.stub(mockDailyExpense, 'addDailyExpense')
      .returns(new Promise((resolve)=>{
        resolve({insertedCount:1})
      }));

    let response = buildResponse()
    let request = http_mocks.createRequest({
      method: 'POST',
      url: '/api/expense/day/20180901',
      body: { consumptions: [{amount:3000, desc:'test'}] }
    });

    response.on('end', function () {
      should(response._isJSON()).be.exactly(true);

      data = JSON.parse(response._getData());

      should.equal(data.status, 200);
      should.equal(data.insertedCount, 1);

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense);
    expenseController.addDailyExpense(request, response);

    addDailyExpenseStub.calledOnceWithExactly('20180901', [{amount:3000, desc:'test'}]);
    addDailyExpenseStub.restore();
  })

  it('given DB write impossible, when addDailyExpense called, should call addDailyExpense and return error', function () {
    let addDailyExpenseStub = sinon.stub(mockDailyExpense, 'addDailyExpense')
      .returns(new Promise((reject)=>{
        reject({error:'DB error'})
      }));

    let response = buildResponse()
    let request = http_mocks.createRequest({
      method: 'POST',
      url: '/api/expense/day/20180901',
      body: { consumptions: [{amount:3000, desc:'test'}] }
    });

    response.on('end', function () {
      should(response._isJSON()).be.exactly(true);

      data = JSON.parse(response._getData());

      should.equal(data.status, 500);
      should.equal(data.error, 'DB error');

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense);
    expenseController.addDailyExpense(request, response);
    
    addDailyExpenseStub.calledOnceWithExactly('20180901', [{amount:3000, desc:'test'}]);
    addDailyExpenseStub.restore();
  })
})