import Ember from 'ember';
import startApp from '../../helpers/start-app';
import debateIndexPage from '../../helpers/pages/debates/index';
import debatePage from '../../helpers/pages/debate';

var App;

module('Acceptance: Debate Index Page Tests', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Add a new debate', function() {
  visit('/');
  andThen(function() {
    var debateTitle = 'New debate added by automated test';
    debateIndexPage.submit(debateTitle);
    andThen(function() {
      debateIndexPage.assertLast({ title: debateTitle, score: '0' });
    });
  });
});

test('Navigate to debate details', function() {
  visit('/');
  andThen(function() {
    var debate = debateIndexPage.first();
    debateIndexPage.visitFirstDebate();
    andThen(function() {
      debatePage.assertCurrent(debate);
      debatePage.assertHasStatements();
    });
  });
});
