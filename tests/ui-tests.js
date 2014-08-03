casper.test.begin('The Debate homepage', 15, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
  });

  var firstDebate = '.debate-list li:first-of-type a';
  var penultimateDebate = '.debate-list li:nth-last-of-type(2)';
  var debateDetail = '.debate.detail';
  var statementDetail = '.statement.detail';
  var firstStatement = '.statements a:first-of-type .statement';
  var firstResponse = '.responses a:first-of-type .statement';

  casper.then(function main_page_loads() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.then(function create_new_debate() {
    var debateTitle = 'New debate added by capser';
    this.sendKeys('#new-debate', debateTitle);
    this.sendKeys('#new-debate', casper.page.event.key.Enter);
    test.assertEval(function() { return __utils__.findAll('.debate-list .debate').length > 1; });
    test.assertSelectorHasText(penultimateDebate + ' .debate-title', debateTitle);
    test.assertSelectorHasText(penultimateDebate + ' .debate-score', '0');
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

  casper.run(function() {
    test.done();
  });
});