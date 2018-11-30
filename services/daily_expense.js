const mongoQuery = require('../mongodao/mongodb_query');

let daily_expense = {};

const collectionName = 'daily-expense';

daily_expense = {    
    getExpense: async function (mongoDB, date) {
        return await mongoQuery.findOneDoc(mongoDB, collectionName, {'datetime': date})
            .then((doc) => {
                if(!doc){                    
                    doc = { 'datetime': date, 'consumptions': []};    
                }
                return doc;
            }).catch((reason) => {
                console.log(reason);
            });
    },
    addDailyExpense: async function (mongoDB, date, consumption) {
        let document = await daily_expense.getExpense(mongoDB, date);
        document.consumptions = [...document.consumptions, consumption];
        return mongoQuery.insertOne(mongoDB, collectionName, document);
    }
}

module.exports = daily_expense;