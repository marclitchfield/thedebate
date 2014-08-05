casper.test.begin('The Debate homepage', 40, function suite(test) {
  var debateIndexPage;
  var debatePage;
  var statementPage;

  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
    debateIndexPage = require('pages/debate-index')(casper, test);
    debatePage = require('pages/debate')(casper, test);
    statementPage = require('pages/statement')(casper, test);
  });

  casper.then(function main_page_loads() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.then(function create_new_debate() {
    var debateTitle = 'New debate added by capser';
    debateIndexPage.submit(debateTitle);
    debateIndexPage.assertLast(debateTitle, '0');
  });

  casper.then(function navigate_to_debate_details() {
    var debate = debateIndexPage.first();
    debateIndexPage.navigateToFirst(function() {
      debatePage.assertCurrent(debate.title, debate.score);
      debatePage.assertHasStatements();
    });
  });

  casper.then(function submit_statement() {
    var statementBody = 'New statement added by casper';
    debatePage.submitStatement(statementBody);
    debatePage.assertLastStatement(statementBody, '0');
  });

  casper.then(function navigate_to_statement_details() {
    var debate = debatePage.current();
    var statement = debatePage.firstStatement();
    debatePage.navigateToFirst(function() {
      statementPage.assertDebate(debate.title, debate.score);
      statementPage.assertCurrent(statement.body, statement.score);
      statementPage.assertHasResponses();
    });
  });

  casper.then(function navigate_to_response_details() {
    var debate = statementPage.currentDebate();
    var statement = statementPage.current();
    var response = statementPage.firstResponse();
    statementPage.navigateToFirst(function() {
      statementPage.assertDebate(debate.title, debate.score);
      statementPage.assertParent(statement.body, statement.score);
      statementPage.assertCurrent(response.body, response.score);
      statementPage.assertHasResponses();
    });
  });

  casper.then(function submit_response() {
    var responseBody = 'New statement added by casper';
    statementPage.submitResponse(responseBody);
    statementPage.assertLastResponse(responseBody, '0');
  });

  casper.then(function submit_responses_and_navigate_chain() {
    var debate = statementPage.currentDebate();
    var statement = statementPage.current();

    // submit first response
    var responseBody1 = 'Statement 1';
    statementPage.submitResponse(responseBody1);
    statementPage.assertLastResponse(responseBody1, '0');
    statementPage.navigateToLast(function() {
      statementPage.assertDebate(debate.title, debate.score);
      statementPage.assertParent(statement.body, statement.score);
      statementPage.assertCurrent(responseBody1, '0');

      // submit second response
      var responseBody2 = 'Statement 2';
      statementPage.submitResponse(responseBody2);
      statementPage.assertLastResponse(responseBody2, '0');
      statementPage.navigateToLast(function() {
        statementPage.assertDebate(debate.title, debate.score);
        statementPage.assertGrandparent(statement.body, statement.score);
        statementPage.assertParent(responseBody1, '0');
        statementPage.assertCurrent(responseBody2, '0');
      });
    });
  });

  casper.run(function() {
    test.done();
  });
});