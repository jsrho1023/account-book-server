require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 4500;

const mongoConnector = require('./mongodao/mongodb_connector');
const MongoQuery = require('./mongodao/mongodb_query');
const DailyExpenseService = require('./services/daily_expense');
const ExpenseController = require('./routers/expense_controller');

const mongoDB = mongoConnector.initDatabase(process.env.MONGO_URI, process.env.DATABASE_NAME);
const mongoQuery = new MongoQuery(mongoDB);
const dailyExpenseService = new DailyExpenseService(mongoQuery);
const expenseController = new ExpenseController(dailyExpenseService);

const router = require('./routers')(app, expenseController);

app.use(parser.json());

app.listen(port, function () {
  console.log(`API server is listening on port ${port}`)
});