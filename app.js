require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4500;

const MongoConnector = require('./mongodao/mongodb_connector');
const MongoQuery = require('./mongodao/mongodb_query');
const DailyExpenseService = require('./services/daily_expense');
const ExpenseController = require('./routers/expense_controller');

const mongoConnector = new MongoConnector(process.env.MONGO_URI);

app.use(cors());
app.use(parser.json());

mongoConnector.initDatabase(process.env.DATABASE_NAME)
  .then((mongoDB)=>{
    const mongoQuery = new MongoQuery(mongoDB);
    const dailyExpenseService = new DailyExpenseService(mongoQuery);
    const expenseController = new ExpenseController(dailyExpenseService);

    const router = require('./routers')(app, expenseController);

    app.get('/close', (req, res) => {
      mongoConnector.closeConnection()
        .then(()=>{
          process.exit();
        });      
    });

    app.listen(port, function () {
      console.log(`API server is listening on port ${port}`)
    });
  })
