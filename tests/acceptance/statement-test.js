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
  visit('/statement/1/responses');
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

test('Submit response', function() {
  var responseBody = 'Response For Test: Submit response';
  visit('/statement/1/responses/create');
  andThen(function() {
    statementPage.submitResponse(responseBody);
  });
  andThen(function() {
    statementPage.assertLastResponse({ body: responseBody, score: '0' });
  });
});

test('Submit objection', function() {
  var responseBody = 'Objection For Test: Submit objection';
  visit('/statement/1/objections/create');
  andThen(function() {
    statementPage.submitResponse(responseBody);
  });
  andThen(function() {
    statementPage.showObjections();
  });
  andThen(function() {
    statementPage.assertLastResponse({ body: responseBody, score: '0' });
  });
});

test('Navigate to response, submit response, and navigate to new response', function() {
  var responseBody = 'Response For Test: Navigate to response, submit response, and navigate to new response';
  visit('/statement/1/responses');
  andThen(function() {
    var debate = statementPage.currentDebate();
    var statement = statementPage.current();
    var response = statementPage.lastResponse();
    statementPage.visitLastResponse();
    andThen(function() {
      statementPage.assertDebate(debate);
      statementPage.assertParent(statement);
      statementPage.assertCurrent(response);
      statementPage.newResponse();
    });
    andThen(function() {
      statementPage.submitResponse(responseBody);
    });
    andThen(function() {
      statementPage.assertLastResponse({ body: responseBody, score: '0' });
      statementPage.visitLastResponse();
    });
    andThen(function() {
      statementPage.assertDebate(debate);
      statementPage.assertGrandparent(statement);
      statementPage.assertParent(response);
      statementPage.assertCurrent({ body: responseBody, score: '0' });
    });
  });
});