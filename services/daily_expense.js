const mongoConnector = require('../mongodao/mongodb_connector')
const mongoQuery = require('../mongodao/mongodb_query')

let daily_expense = {}

daily_expense = {
    getExpense: function (date){
        return {
            "datetime":"2018-09-01",
            "consumptions":[
                {"amount": 1000, "desc":"stop wasting"},
                {"amount": 2000, "desc":"i knew"}
            ]}
    }
}

module.exports = daily_expense