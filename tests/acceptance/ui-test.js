import Ember from 'ember';
import startApp from '../helpers/start-app';
import debateIndexPage from '../acceptance/pages/debates/index';
import debatePage from '../acceptance/pages/debate';
import statementPage from '../acceptance/pages/statement';

var App;

module('Acceptance: UI Tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Visit homepage', function() {
  Ember.run(function() {
    visit('/');
    andThen(function() {
      equal(find('.banner h1').text(), 'The Debate');
    });
  });
});

// test('Add a new debate', function() {
//   visit('/');
//   andThen(function() {
//     var debateTitle = 'New debate added by capser';
//     fillIn('#new-debate', debateTitle);
//     keyEvent('#new-debate', 'keypress', 13);
//     andThen(function() {
//       debateIndexPage.assertLast(debateTitle, '0');
//     });
//   });
// });

test('Navigate to debate details', function() {
  visit('/');
  andThen(function() {
    var debate = debateIndexPage.first();
    debateIndexPage.visitFirstDebate();
    andThen(function() {
      debatePage.assertCurrent(debate.title, debate.score);
      debatePage.assertHasStatements();
    });
  });
});

test('Submit statement', function() {
  var statementBody = 'New statement added by casper';
  visit('/debate/1');
  andThen(function() {
    debatePage.submitStatement(statementBody);
  });
  andThen(function() {
    debatePage.assertLastStatement(statementBody, '0');
  });
});

test('Navigate to statement details', function() {
  visit('/debate/1');
  andThen(function() {
    var debate = debatePage.current();
    var statement = debatePage.firstStatement();
    debatePage.visitFirstStatement();
    andThen(function() {
      statementPage.assertDebate(debate.title, debate.score);
      statementPage.assertCurrent(statement.body, statement.score);
      statementPage.assertHasResponses();
    });  
  });
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