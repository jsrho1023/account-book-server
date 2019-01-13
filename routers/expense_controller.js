class ExpenseController{
    constructor(dailyExpenseService){
        this.service = dailyExpenseService;
        this.getDailyExpense = this.getDailyExpense.bind(this);
        this.saveDailyExpense = this.saveDailyExpense.bind(this);
    }

    async getDailyExpense (req, res) {
        let data = await this.service.getExpense(req.params.date);
        res.json(data);
    }

    async saveDailyExpense (req, res) {
        await this.service.saveDailyExpense(req.params.date, req.body.consumptions)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}

module.exports = ExpenseController;