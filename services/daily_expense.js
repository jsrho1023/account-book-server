const mongoConnector = require('../mongodao/mongodb_connector')
const mongoQuery = require('../mongodao/mongodb_query')

let daily_expense = {}

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'account-book';
const db = mongoConnector.initDatabase(url, dbName);

daily_expense = {
    getExpense: function (date) {
        return {
            "datetime": "2018-09-01",
            "consumptions": [
                { "amount": 1000, "desc": "stop wasting" },
                { "amount": 2000, "desc": "i knew" }
            ]
        }
    },
    addDailyExpense: function (date, consumption) {
        let data = getExpense(date);
        data.consumptions = [...consumptions, consumption];
        return mongoQuery.insertOne(db, 'account-book', data)
    }
}

module.exports = daily_expense