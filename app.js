var express = require('express');
var app = express();

var router = require('./routers')(app);

app.listen(3000, function () {
  console.log('API server is listening on port 3000');
});