import Ember from 'ember';
import startApp from '../helpers/start-app';
import debatePage from '../helpers/pages/debate';
import statementPage from '../helpers/pages/statement';

var App;

module('Acceptance: Debate Page Tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Submit statement', function() {
  var statementBody = 'New statement added by casper';
  visit('/debate/1');
  andThen(function() {
    debatePage.submitStatement(statementBody);
  });
  andThen(function() {
    debatePage.assertLastStatement({ body: statementBody, score: '0' });
  });
});

test('Navigate to statement details', function() {
  visit('/debate/1');
  andThen(function() {
    var debate = debatePage.current();
    var statement = debatePage.firstStatement();
    debatePage.visitFirstStatement();
    andThen(function() {
      statementPage.assertDebate(debate);
      statementPage.assertCurrent(statement);
      statementPage.assertHasResponses();
    });  
  });
});
