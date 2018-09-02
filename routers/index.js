const controllers = require('./controllers')

module.exports = function(app){
  app.get('/api/expense/day/:date', controllers.expense.addDailyExpense)
  
  app.get('/api', function (req, res) {
    res.send('Account Book APIs!')
  })
}