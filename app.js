var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Account Book APIs!');
});

app.listen(3000, function () {
  console.log('API server is listening on port 3000');
});