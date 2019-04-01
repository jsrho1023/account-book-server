module.exports = function(app, expenseController){
  
  app.get('/api/expense/day/:date', expenseController.getDailyExpense)

  app.post('/api/expense/day/:date', expenseController.saveDailyExpense)

  app.delete('/api/expense/day/:date', expenseController.deleteDailyExpense)
  
  app.get('/api', function (req, res) {
    res.send('Account Book APIs!')
  })
}