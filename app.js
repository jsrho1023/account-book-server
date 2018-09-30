require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 4500;

const router = require('./routers')(app);

app.use(parser.json());

app.listen(port, function () {
  console.log(`API server is listening on port ${port}`)
});