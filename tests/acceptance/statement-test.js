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
      statementPage.assertDebate(debate);
      statementPage.assertParent(statement);
      statementPage.assertCurrent(response);
      statementPage.assertHasResponses();
    });
  });
});

// test('Submit response', function() {
//   var responseBody = 'New response added by casper';
//   statementPage.submitResponse(responseBody);
//   statementPage.assertLastResponse({ body: responseBody, score: '0' });
// });

// test('Navigate response chain', function() {
//   var debate = statementPage.currentDebate();
//   var statement = statementPage.current();
//   var response = statementPage.lastResponse();

//   statementPage.navigateToLast(function() {
//     statementPage.assertDebate(debate);
//     statementPage.assertParent(statement);
//     statementPage.assertCurrent(response);

//     // submit second response
//     var responseBody = 'Another response added by casper';
//     statementPage.submitResponse(responseBody);
//     statementPage.assertLastResponse({ body: responseBody, score: '0' });
//     statementPage.navigateToLast(function() {
//       statementPage.assertDebate(debate);
//       statementPage.assertGrandparent(statement);
//       statementPage.assertParent(response.body, '0');
//       statementPage.assertCurrent(responseBody, '0');
//     });
//   });
// });