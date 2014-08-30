import Ember from 'ember';
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

// trying to get these to pass, but I don't have it figured out yet

// test('isResponse should be false when parent is undefined', function() {
//   var model = this.subject();
//   equal(false, model.get('isResponse'));
// });

// test('isResponse should be true when parent is defined', function() {
//   var model = this.subject();
//   var store = this.store();
//   Ember.run(function() {
//     store.createRecord('statement', {id:-1,body:'body'});
//     store.find('statement', -1).then(function(parent) {
//       console.log(JSON.stringify(parent, undefined, 2));
//       model.set('parent', parent);
//     });
//   });
//   equal(true, model.get('isResponse'));
// });
