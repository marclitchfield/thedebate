import { test, moduleForModel } from 'ember-qunit';

moduleForModel('debate', 'Debate', {
  // Specify the other units that are required for this test.
  needs: ['model:statement']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});