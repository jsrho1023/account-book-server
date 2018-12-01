class ExpenseController{
    constructor(dailyExpenseService){
        this.service = dailyExpenseService;
    }

    async getDailyExpense (req, res) {
        let data = await this.service.getExpense(req.query.date);
        res.json(data);
    }

    async addDailyExpense (req, res) {
        await this.service.addDailyExpense(req.query.date, req.body.consumptions)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}

module.exports = ExpenseController;