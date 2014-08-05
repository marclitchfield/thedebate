casper.test.begin('The Debate homepage', 32, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
  });

  var firstDebate = '.debate-list li:first-of-type a';
  var lastDebate = '.debate-list li:nth-last-of-type(2)';
  var debateDetail = '.detail .context .debate';
  var statementDetail = '.detail .context .statement.current';
  var firstStatement = '.statements a:first-of-type .statement';
  var firstResponse = '.responses a:first-of-type .statement';
  var lastStatement = '.statements a:last-of-type .statement';
  var lastResponse = '.responses a:last-of-type .statement';
  var parentStatement = '.detail .context a:last-of-type .statement';
  var grandparentStatement = '.detail .context a:nth-last-of-type(2) .statement';

  casper.then(function main_page_loads() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.then(function create_new_debate() {
    var debateTitle = 'New debate added by capser';
    this.sendKeys('#new-debate', debateTitle);
    this.sendKeys('#new-debate', casper.page.event.key.Enter);
    test.assertEval(function() { return __utils__.findAll('.debate-list .debate').length > 1; });
    test.assertSelectorHasText(lastDebate + ' .debate-title', debateTitle);
    test.assertSelectorHasText(lastDebate + ' .debate-score', '0');
  });

  casper.then(function navigate_to_debate_details() {
    var debateText = this.fetchText(firstDebate + ' .debate-title');
    var debateScore = this.fetchText(firstDebate + ' .debate-score');
    this.click(firstDebate);
    casper.waitForSelector(debateDetail, function() {
      test.assertSelectorHasText(debateDetail + ' .debate-title', debateText);
      test.assertSelectorHasText(debateDetail + ' .debate-score', debateScore);
      test.assertEval(function() { return __utils__.findAll('.statement').length > 0; });
    });
  });

  casper.then(function submit_statement() {
    var debateText = this.fetchText(debateDetail + ' .debate-title');
    var debateScore = this.fetchText(debateDetail + ' .debate-score');
    var statementBody = 'New statement added by casper';
    this.sendKeys('#new-statement', statementBody);
    this.click('#submit-statement');
    test.assertSelectorHasText(lastStatement + ' .statement-body', statementBody);
    test.assertSelectorHasText(lastStatement + ' .statement-score', '0');
  });

  casper.then(function navigate_to_new_statement_details() {
    var debateText = this.fetchText(debateDetail + ' .debate-title');
    var debateScore = this.fetchText(debateDetail + ' .debate-score');
    var statementBody = this.fetchText(lastStatement + ' .statement-body');
    this.click(lastStatement);
    casper.waitForSelector(statementDetail, function() {
      test.assertSelectorHasText(debateDetail + ' .debate-title', debateText);
      test.assertSelectorHasText(debateDetail + ' .debate-score', debateScore);
      test.assertSelectorHasText(statementDetail + ' .statement-body', statementBody);
      test.assertSelectorHasText(statementDetail + ' .statement-score', '0');
      casper.back();
    });
  });

  casper.then(function navigate_to_statement_details() {
    var debateText = this.fetchText(debateDetail + ' .debate-title');
    var debateScore = this.fetchText(debateDetail + ' .debate-score');
    var statementBody = this.fetchText(firstStatement + ' .statement-body');
    var statementScore = this.fetchText(firstStatement + ' .statement-score');
    this.click(firstStatement);
    casper.waitForSelector(statementDetail, function() {
      test.assertSelectorHasText(debateDetail + ' .debate-title', debateText);
      test.assertSelectorHasText(debateDetail + ' .debate-score', debateScore);
      test.assertSelectorHasText(statementDetail + ' .statement-body', statementBody);
      test.assertSelectorHasText(statementDetail + ' .statement-score', statementScore);
      test.assertEval(function() { return __utils__.findAll('.responses .statement').length > 0; });
    });
  });

  casper.then(function navigate_to_response_details() {
    var statementBody = this.fetchText(firstResponse + ' .statement-body');
    var statementScore = this.fetchText(firstResponse + ' .statement-score');
    this.click(firstResponse);
    casper.waitForSelector('.responses .statement', function() {
      test.assertSelectorHasText(statementDetail + ' .statement-body', statementBody);
      test.assertSelectorHasText(statementDetail + ' .statement-score', statementScore);
      test.assertEval(function() { return __utils__.findAll('.responses .statement').length > 0; });
    });
  });

  casper.then(function submit_response() {
    var responseBody = 'New statement added by casper';
    this.sendKeys('#new-response', responseBody);
    this.click('#submit-response');
    test.assertSelectorHasText(lastResponse + ' .statement-body', responseBody);
    test.assertSelectorHasText(lastResponse + ' .statement-score', '0');
  });

  casper.then(function submit_responses_and_navigate_chain() {
    // submit first response
    var debateText = this.fetchText(debateDetail + ' .debate-title');
    var contextStatementText = this.fetchText(statementDetail + ' .statement-body');
    var responseBody1 = 'Statement 1';
    this.sendKeys('#new-response', responseBody1);
    this.click('#submit-response');
    test.assertSelectorHasText(lastResponse + ' .statement-body', responseBody1);
    var responseUrl1 = this.getElementAttribute(lastResponse, 'href');
    // navigate to first response
    this.click(lastResponse);
    casper.waitForUrl(responseUrl1, function() {
      test.assertSelectorHasText(debateDetail + ' .debate-title', debateText);
      test.assertSelectorHasText(parentStatement + ' .statement-body', contextStatementText);
      test.assertSelectorHasText(statementDetail + ' .statement-body', responseBody1);

      // submit second response
      var responseBody2 = 'Statement 2';
      this.sendKeys('#new-response', responseBody2);
      this.click('#submit-response');
      test.assertSelectorHasText(lastResponse + ' .statement-body', responseBody2);
      var responseUrl2 = this.getElementAttribute(lastResponse, 'href');
      // navigate to second response
      this.click(lastResponse);
      casper.waitForUrl(responseUrl2, function() {
        test.assertSelectorHasText(debateDetail + ' .debate-title', debateText);
        test.assertSelectorHasText(grandparentStatement + ' .statement-body', contextStatementText);
        test.assertSelectorHasText(parentStatement + ' .statement-body', responseBody1);
        test.assertSelectorHasText(statementDetail + ' .statement-body', responseBody2);
      });
    });    
  });




  casper.run(function() {
    test.done();
  });
});