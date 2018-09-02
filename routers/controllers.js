const dailyExpenseService = require('../services/daily_expense')

let controllers = {}

controllers.expense = {
    addDailyExpense : function (req, res){
        let data = dailyExpenseService.getExpense('2018-09-01')
        res.json(data)
    }
}

module.exports = controllers