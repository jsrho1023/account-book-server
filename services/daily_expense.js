class DailyExpense {
    constructor(mongoQuery){
        this.query = mongoQuery;
        this.collectionName = 'daily-expense';
    }

    async getExpense (date) {
        return await this.query.findOneDoc(this.collectionName, {'datetime': date})
            .then((doc) => {
                if(!doc){                    
                    doc = { 'datetime': date, 'consumptions': []};    
                }
                return doc;
            }).catch((reason) => {
                console.error(reason);
            });
    }

    async addDailyExpense (date, consumption) {
        let document = await this.getExpense(date);
        document.consumptions = [...document.consumptions, ...consumption];
        return this.query.insertOne(this.collectionName, document);
    }

    async deleteExpense (date){
        return await this.query.deleteOne(this.collectionName, {'datetime': date});
    };
}

module.exports = DailyExpense;