module.exports = function(app){
  app.get('/api/expense/day/:date', function(req, res) {
    res.send('test');
  });
  
  app.get('/api', function (req, res) {
    res.send('Account Book APIs!');
  });
}