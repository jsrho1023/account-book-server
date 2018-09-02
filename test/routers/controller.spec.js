const controller = require('../../routers/controllers')
let http_mocks = require('node-mocks-http')
let mockery = require('mockery')
let should = require('should')

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('Controller Test', function() {

    before(function() {
      mockery.enable({
        warnOnUnregistered: false
      })
    })
  
    after(function() {
      mockery.disable()
    })
  
    it('expense controller should return ', function(done) {
      var response = buildResponse()
      var request  = http_mocks.createRequest({
        method: 'GET',
        url: '/api/expense/day/20180901',
      })
      response.on('end', function() {
        should(response._isJSON()).be.exactly(true)
  
        data = JSON.parse(response._getData())

        should.equal(data.datetime, "2018-09-01")

        done()
      })
  
      controller.expense.addDailyExpense(request, response)
    })
})