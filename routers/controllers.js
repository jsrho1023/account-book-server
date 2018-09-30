const dailyExpenseService = require('../services/daily_expense')

let controllers = {}

controllers.expense = {
    getDailyExpense: function (req, res) {
        let data = dailyExpenseService.getExpense(req.query.date);
        res.json(data);
    },

    addDailyExpense: function (req, res) {
        dailyExpenseService.addDailyExpense(req.query.date, req.body.consumption)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}

module.exports = controllers