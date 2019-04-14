class ExpenseController{
    constructor(dailyExpenseService, monthlyExpenseService){
        this.dailyExpenseService = dailyExpenseService;
        this.monthlyExpenseService = monthlyExpenseService;
        this.getDailyExpense = this.getDailyExpense.bind(this);
        this.saveDailyExpense = this.saveDailyExpense.bind(this);
        this.deleteDailyExpense = this.deleteDailyExpense.bind(this);
        this.getMonthlyExpense = this.getMonthlyExpense.bind(this);
    }

    async getDailyExpense (req, res) {
        const data = await this.dailyExpenseService.getExpense(req.params.date);
        res.json(data);
    }

    async saveDailyExpense (req, res) {
        await this.dailyExpenseService.saveExpense(req.params.date, req.body.consumptions)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    async deleteDailyExpense(req, res) {
        await this.dailyExpenseService.deleteExpense(req.params.date)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error)=>{
                res.status(500).json(error);
            });
    }

    async getMonthlyExpense(req, res) {
        const result = await this.monthlyExpenseService.getMonthlyExpense(req.params.date);
        if(result.error){
            res.status(500).json(result);
        }
        res.status(200).json(result);
    }
}

module.exports = ExpenseController;