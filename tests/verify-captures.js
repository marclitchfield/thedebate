var _ = require('lodash');
var dirdiff = require('../node_modules/node-dir-diff');

describe('Verify screenshot captures', function() {

  it('actual should match expected', function(done) {
    var diff = new dirdiff.Dir_Diff(
      [
        'tests/captures/expected',
        'tests/captures/actual',
      ],
      'full'
    );

    diff.compare(function(err, result) {
      var error = err;
      if (!error && result.deviation > 0) {
        error = _.map(result.deviations, function(d) {
          return d.variant + ': ' + d.info
        }).join('\n');
      }

      console.log('Error: ', error);
      done(error);
    });
  });
});