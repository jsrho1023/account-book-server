class DailyExpense {
    constructor(mongoQuery){
        this.query = mongoQuery;
        this.collectionName = 'daily-expense';
    }

    async getExpense (date) {
        const cursor = this.query.findAll(this.collectionName, {'datetime': date})

        let result = {'datetime': date, 'consumptions': []}
        
        while(await cursor.hasNext()){
            const doc = await cursor.next();
            result.consumptions.push(doc.consumption);
        }

        return result;
    }

    async saveDailyExpense (date, consumptions) {
        let docs = [];
        consumptions.forEach(consumption => {
            docs.push({'datetime': date, 'consumption': consumption})
        });
        return await this.query.insertMany(this.collectionName, docs);
    }

    async deleteExpense (date){
        return await this.query.deleteMany(this.collectionName, {'datetime': date});
    };
}

module.exports = DailyExpense;