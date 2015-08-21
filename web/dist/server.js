var express = require('express');
var app = express();
// var fs = require('fs');
// var path = require('path');
// var mime = require('mime');
var request = require('request');

// var baseUrl = '/';
// var rootDirectory = './dist/public/';

app.use('api/*', function(req, res) {
  var url = 'http://localhost:9004/' + req.url;
  console.log('API: ' + url);
  req.pipe(request(url)).pipe(res);
});

// app.get('*', function(req, res) {
//   var isForBaseURL = req.path === baseUrl;
// 
//   var assetPath = req.path.slice(baseUrl.length);
//   var resourcePath = path.join(rootDirectory, assetPath);
//   
//   if (isForBaseURL || !fs.existsSync(resourcePath)) {
//     resourcePath = path.join(rootDirectory, 'index.html');
//   }
// 
//   res.setHeader("content-type", mime.lookup(resourcePath));
//   fs.createReadStream(resourcePath).pipe(res);
// });

var server = app.listen(9002, function() {
  console.log('Listening on port %d', server.address().port);
});
