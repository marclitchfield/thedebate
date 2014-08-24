import { test, moduleForModel } from 'ember-qunit';

moduleForModel('statement', 'Statement', {
  // Specify the other units that are required for this test.
  needs: ['model:debate']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
