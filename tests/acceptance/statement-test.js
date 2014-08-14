import Ember from 'ember';
import startApp from '../helpers/start-app';
import statementPage from '../helpers/pages/statement';

var App;

module('Acceptance: Statement Page Tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Navigate to response details', function() {
  visit('/statement/1');
  andThen(function() {
    var debate = statementPage.currentDebate();
    var statement = statementPage.current();
    var response = statementPage.firstResponse();

    statementPage.visitFirstResponse();
    andThen(function() {
      statementPage.assertDebate(debate.title, debate.score);
      statementPage.assertParent(statement.body, statement.score);
      statementPage.assertCurrent(response.body, response.score);
      statementPage.assertHasResponses();
    });
  });
});

// test('Submit response', function() {
//   var responseBody = 'New response added by casper';
//   statementPage.submitResponse(responseBody);
//   statementPage.assertLastResponse(responseBody, '0');
// });

// test('Navigate response chain', function() {
//   var debate = statementPage.currentDebate();
//   var statement = statementPage.current();
//   var response = statementPage.lastResponse();

//   statementPage.navigateToLast(function() {
//     statementPage.assertDebate(debate.title, debate.score);
//     statementPage.assertParent(statement.body, statement.score);
//     statementPage.assertCurrent(response.body, response.score);

//     // submit second response
//     var responseBody = 'Another response added by casper';
//     statementPage.submitResponse(responseBody);
//     statementPage.assertLastResponse(responseBody, '0');
//     statementPage.navigateToLast(function() {
//       statementPage.assertDebate(debate.title, debate.score);
//       statementPage.assertGrandparent(statement.body, statement.score);
//       statementPage.assertParent(response.body, '0');
//       statementPage.assertCurrent(responseBody, '0');
//     });
//   });
// });