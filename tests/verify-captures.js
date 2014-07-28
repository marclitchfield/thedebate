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
      var error = result.deviation > 0 ? JSON.stringify(result.deviations, undefined, 2) : err;
      if (error) {
        done(new Error(error));
      } else {
        done();
      }
    });
  });
});
