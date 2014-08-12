import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Ui', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'debates.index');
  });
});
