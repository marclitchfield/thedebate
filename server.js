var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Welcome to the debate');
});

var server = app.listen(9002, function() {
    console.log('Listening on port %d', server.address().port);
});