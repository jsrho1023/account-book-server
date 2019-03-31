class ExpenseController{
    constructor(dailyExpenseService, monthlyExpenseService){
        this.dailyExpenseService = dailyExpenseService;
        this.monthlyExpenseService = monthlyExpenseService;
        this.getDailyExpense = this.getDailyExpense.bind(this);
        this.saveDailyExpense = this.saveDailyExpense.bind(this);
    }

    async getDailyExpense (req, res) {
        let data = await this.dailyExpenseService.getExpense(req.params.date);
        res.json(data);
    }

    async saveDailyExpense (req, res) {
        await this.dailyExpenseService.saveExpense(req.params.date, req.body.consumptions)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }

    async deleteDailyExpense(req, res) {
        await this.dailyExpenseService.deleteExpense(req.params.date)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error)=>{
                res.status(500).send(error);
            });
    }
}

module.exports = ExpenseController;