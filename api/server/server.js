var Hapi = require('hapi');
var Good = require('good');
var mongoose = require('mongoose');

var server = new Hapi.Server();
var apiPort = parseInt(process.env.PORT || 9003) + 1;
server.connection({ port: apiPort });
console.log('Will listen on port ' + apiPort);
console.log('Connecting to mongo at ' + process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

require('./routes/debates')(server);
require('./routes/statements')(server);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      args: [{ error: '*', log: '*', response: '*' }]
    }]
  }
}, function (err) {
  if (err) { throw err; }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
