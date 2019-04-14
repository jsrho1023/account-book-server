const sinon = require('sinon');
const http_mocks = require('node-mocks-http');
const should = require('should');
const ExpenseController = require('../../routers/expense_controller');

function buildResponse() {
  return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Controller Test', function () {
  let mockDailyExpense, mockMonthlyExpense;
  before(()=>{
    mockDailyExpense = {
      getExpense: function(){},
      saveExpense: function(){},
      deleteExpense: function(){}
    };
    mockMonthlyExpense = {
      getMonthlyExpense: function(){}
    }
  })

  it('when getDailyExpense called, should call getExpense and return data', (done) => {

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

    const expenseController = new ExpenseController(mockDailyExpense, mockMonthlyExpense);
    expenseController.getDailyExpense(request, response);

    getExpenseStub.calledOnceWithExactly('20180901');
    getExpenseStub.restore();
  })

  it('given DB write success, when saveExpense called, should call saveExpense and return result', (done) => {
    let saveExpenseStub = sinon.stub(mockDailyExpense, 'saveExpense')
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
      should.equal(response._getStatusCode(), 200);
      should.equal(data.insertedCount, 1);

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense, mockMonthlyExpense);
    expenseController.saveDailyExpense(request, response);

    saveExpenseStub.calledOnceWithExactly('20180901', [{amount:3000, desc:'test'}]);
    saveExpenseStub.restore();
  })

  it('given DB write impossible, when saveExpense called, should call saveExpense and return error', function (done) {
    let saveExpenseStub = sinon.stub(mockDailyExpense, 'saveExpense')
      .returns(new Promise((_resolve, reject)=>{
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
      should.equal(response._getStatusCode(), 500);
      should.equal(data.error, 'DB error');

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense, mockMonthlyExpense);
    expenseController.saveDailyExpense(request, response);
    
    saveExpenseStub.calledOnceWithExactly('20180901', [{amount:3000, desc:'test'}]);
    saveExpenseStub.restore();
  })

  it('when deleteDailyExpense called, then call dailyExpenseService deleteExpense', (done)=>{
    let deleteExpenseStub = sinon.stub(mockDailyExpense, 'deleteExpense')
      .returns(new Promise((resolve)=>{
        resolve({deletedCount:1})
      }));

    let response = buildResponse()
    let request = http_mocks.createRequest({
      method: 'DELETE',
      url: '/api/expense/day/20190331'
    });

    response.on('end', function () {
      should(response._isJSON()).be.exactly(true);

      data = JSON.parse(response._getData());
      should.equal(response._getStatusCode(), 200);
      should.equal(data.deletedCount, 1);

      done();
    })

    const expenseController = new ExpenseController(mockDailyExpense, mockMonthlyExpense);
    expenseController.deleteDailyExpense(request, response);

    deleteExpenseStub.calledOnceWithExactly('20190331');
    deleteExpenseStub.restore();
  })

  it('when getMonthlyExpense called, then call monthlyExpenseService getMonthlyExpense', (done) => {
    let getMonthlyExpenseStub = sinon.stub(mockMonthlyExpense, 'getMonthlyExpense')
      .returns([
        {datetime:'2019-04-05', consumption:{amount:1000, desc:'test1'}},
        {datetime:'2019-04-06', consumption:{amount:1000, desc:'test2'}},
        {datetime:'2019-04-07', consumption:{amount:1000, desc:'test3'}}
      ]);

      let response = buildResponse();
      const request = http_mocks.createRequest({
        method: 'GET',
        url: '/api/expense/month/2019-04-05'
      });

      response.on('end', function () {
        should(response._isJSON()).be.exactly(true);

        data = JSON.parse(response._getData());
        should.equal(response._getStatusCode(), 200);
        should.equal(data.length, 3);
  
        done();
      });

      const expenseController = new ExpenseController(mockDailyExpense, mockMonthlyExpense);
      expenseController.getMonthlyExpense(request, response);

      getMonthlyExpenseStub.calledOnceWithExactly('2019-04-05');
      getMonthlyExpenseStub.restore();
  })
})