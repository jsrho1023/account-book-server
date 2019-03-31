class DailyExpense {
    constructor(mongoQuery, moment){
        this.query = mongoQuery;
        this.datetimeUtil = moment;
        this.collectionName = 'daily-expense';
    }

    async getExpense (datetime) {
        const momentDatetime = this.datetimeUtil(datetime);        
        const cursor = this.query.findAll(this.collectionName, {
            'datetime': {
                $gte: momentDatetime.valueOf(),
                $lt: momentDatetime.add(1, 'days').valueOf()
            }
        })

        let result = {'datetime': datetime, 'consumptions': []}
        
        while(await cursor.hasNext()){
            const doc = await cursor.next();
            result.consumptions.push(doc.consumption);
        }

        return result;
    }

    async saveExpense (datetime, consumptions) {
        const momentDatetime = this.datetimeUtil(datetime);

        const docs = consumptions.map((consumption)=>{
            return {'datetime':momentDatetime.valueOf(), 'consumption':consumption};
        });

        return await this.query.insertMany(this.collectionName, docs);
    }

    async deleteExpense (datetime){
        const momentDatetime = this.datetimeUtil(datetime);

        return await this.query.deleteAll(this.collectionName, {
            'datetime': {
                $gte: momentDatetime.valueOf(),
                $lt: momentDatetime.add(1, 'days').valueOf()
            }
        });
    };
}

module.exports = DailyExpense;