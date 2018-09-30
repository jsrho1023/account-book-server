const mockery = require('mockery');
const sinon = require('sinon');
const http_mocks = require('node-mocks-http');
const should = require('should');

const controller = require('../../routers/controllers');
const mock_daily_expense = require('../../services/daily_expense');

function buildResponse() {
  return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Controller Test', function () {

  before(function () {
    mockery.enable({
      warnOnUnregistered: false
    })
    sinon.stub(mock_daily_expense, 'getExpense').returns({
      "datetime": "2018-09-01",
      "consumptions": [
        { "amount": 1000, "desc": "stop wasting" },
        { "amount": 2000, "desc": "i knew" }
      ]
    });
  })

  after(function () {
    mockery.disable()
  })

  it('expense controller should return ', function (done) {
    var response = buildResponse()
    var request = http_mocks.createRequest({
      method: 'GET',
      url: '/api/expense/day/20180901',
    });
    response.on('end', function () {
      should(response._isJSON()).be.exactly(true);

      data = JSON.parse(response._getData());

      should.equal(data.datetime, "2018-09-01");
      should.equal(data.consumptions[0].amount, 1000)
      should.equal(data.consumptions[1].amount, 2000)
      should.equal(data.consumptions[0].desc, "stop wasting")
      should.equal(data.consumptions[1].desc, "i knew")

      done();
    })

    controller.expense.getDailyExpense(request, response);
  })
})