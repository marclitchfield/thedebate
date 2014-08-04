var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', {});
});

var server = app.listen(9002, function() {
  console.log('Listening on port %d', server.address().port);
});