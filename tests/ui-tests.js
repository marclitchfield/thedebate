casper.test.begin('The Debate homepage', 40, function suite(test) {
  var debateIndexPage;
  var debatePage;
  var statementPage;

  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
    debateIndexPage = new DebateIndexPage();
    debatePage = new DebatePage();
    statementPage = new StatementPage();
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

  function DebateIndexPage() {
    var firstDebate = '.debate-list li:first-of-type a';
    var lastDebate = '.debate-list li:nth-last-of-type(2)';

    return {
      first: function() {
        return {
          title: casper.fetchText(firstDebate + ' .debate-title'),
          score: casper.fetchText(firstDebate + ' .debate-score')
        };
      },

      submit: function(title) {
        casper.sendKeys('#new-debate', title);
        casper.sendKeys('#new-debate', casper.page.event.key.Enter);
      },

      assertLast: function(title, score) {
        test.assertSelectorHasText(lastDebate + ' .debate-title', title);
        test.assertSelectorHasText(lastDebate + ' .debate-score', '0');
      },

      navigateToFirst: function(callback) {
        var url = casper.getElementAttribute(firstDebate, 'href');
        casper.click(firstDebate);        
        casper.waitForUrl(url, callback);
      }
    };
  }

  function DebatePage() {
    var debateDetail = '.detail .context .debate';
    var firstStatement = '.statements a:first-of-type .statement';
    var lastStatement = '.statements a:last-of-type .statement';

    return {
      current: function() {
        return {
          title: casper.fetchText(debateDetail + ' .debate-title'),
          score: casper.fetchText(debateDetail + ' .debate-score')
        };
      },

      assertCurrent: function(title, score) {
        test.assertSelectorHasText(debateDetail + ' .debate-title', title);
        test.assertSelectorHasText(debateDetail + ' .debate-score', score);
      },

      assertHasStatements: function() {
        test.assertEval(function() { return __utils__.findAll('.statement').length > 0; });
      },

      submitStatement: function(body) {
        casper.sendKeys('#new-statement', body);
        casper.click('#submit-statement');
      },

      firstStatement: function() {
        return {
          body: casper.fetchText(firstStatement + ' .statement-body'),
          score: casper.fetchText(firstStatement + ' .statement-score')
        };
      },

      lastStatement: function() {
        return {
          body: casper.fetchText(lastStatement + ' .statement-body'),
          score: casper.fetchText(lastStatement + ' .statement-score')
        };
      },

      assertLastStatement: function(body, score) {
        test.assertSelectorHasText(lastStatement + ' .statement-body', body);
        test.assertSelectorHasText(lastStatement + ' .statement-score', score);
      },

      navigateToFirst: function(callback) {
        var url = casper.getElementAttribute(firstStatement, 'href');
        casper.click(firstStatement);
        casper.waitForUrl(url, callback);
      }
    };
  }

  function StatementPage() {
    var debateDetail = '.detail .context .debate';
    var statementDetail = '.detail .context .statement.current';
    var firstResponse = '.responses a:first-of-type .statement';
    var lastResponse = '.responses a:last-of-type .statement';
    var parentStatement = '.detail .context a:last-of-type .statement';
    var grandparentStatement = '.detail .context a:nth-last-of-type(2) .statement';

    return {
      currentDebate: function() {
        return {
          title: casper.fetchText(debateDetail + ' .debate-title'),
          score: casper.fetchText(debateDetail + ' .debate-score')
        };
      },

      current: function() {
        return {
          body: casper.fetchText(statementDetail + ' .statement-body'),
          score: casper.fetchText(statementDetail + ' .statement-score')
        };
      },

      assertDebate: function(title, score) {
        test.assertSelectorHasText(debateDetail + ' .debate-title', title);
        test.assertSelectorHasText(debateDetail + ' .debate-score', score);
      },

      assertCurrent: function(body, score) {
        test.assertSelectorHasText(statementDetail + ' .statement-body', body);
        test.assertSelectorHasText(statementDetail + ' .statement-score', score);
      },

      assertParent: function(body, score) {
        test.assertSelectorHasText(parentStatement + ' .statement-body', body);
        test.assertSelectorHasText(parentStatement + ' .statement-score', score);
      },

      assertGrandparent: function(body, score) {
        test.assertSelectorHasText(grandparentStatement + ' .statement-body', body);
        test.assertSelectorHasText(grandparentStatement + ' .statement-score', score);
      },

      submitResponse: function(body) {
        casper.sendKeys('#new-response', body);
        casper.click('#submit-response');
      },

      firstResponse: function() {
        return {
          body: casper.fetchText(firstResponse + ' .statement-body'),
          score: casper.fetchText(firstResponse + ' .statement-score')
        };
      },

      assertLastResponse: function(body, score) {
        test.assertSelectorHasText(lastResponse + ' .statement-body', body);
        test.assertSelectorHasText(lastResponse + ' .statement-score', score);
      },

      assertHasResponses: function() {
        test.assertEval(function() { return __utils__.findAll('.responses .statement').length > 0; });
      },

      lastResponseUrl: function() {
        return casper.getElementAttribute(lastResponse, 'href');
      },

      navigateToFirst: function(callback) {
        var url = casper.getElementAttribute(firstResponse, 'href');
        casper.click(firstResponse);
        casper.waitForUrl(url, callback);
      },

      navigateToLast: function(callback) {
        var url = casper.getElementAttribute(lastResponse, 'href');
        casper.click(lastResponse);
        casper.waitForUrl(url, callback);
      }      
    };
  }

  casper.run(function() {
    test.done();
  });
});