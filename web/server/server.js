var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var proxy = require('express-http-proxy');
var url = require('url');
var morgan = require('morgan');

var webPort = process.env.PORT || 9002;
var apiPort = parseInt(process.env.PORT || 9003) + 1;
var publicDir = path.resolve(path.join(path.dirname(__filename), 'public'));
console.log('webPort:', webPort, 'apiPort:', apiPort, 'publicDir:', publicDir);

app.use('/api', proxy('localhost:' + apiPort, {
  forwardPath: function(req) {
    return '/api' + url.parse(req.url).path;
  }
}));

app.get('*', function(req, res) {
  var isForBaseURL = req.path === '/';
  var resourcePath = path.join(publicDir, req.path);

  if (isForBaseURL || !fs.existsSync(resourcePath)) {
    resourcePath = path.join(publicDir, 'index.html');
  }

  res.header('Content-Type', mime.lookup(resourcePath));
  fs.createReadStream(resourcePath).pipe(res);
});

app.use(morgan('dev'));

var server = app.listen(webPort, function() {
  console.log('Listening on port %d', server.address().port);
});
