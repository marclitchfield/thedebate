casper.test.begin('The Debate homepage', 5, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
  });

  casper.then(function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.then(function() {
    var debateTitle = 'New debate added by capser';
    this.sendKeys('#new-debate', debateTitle);
    this.sendKeys('#new-debate', casper.page.event.key.Enter);
    test.assertSelectorHasText('.debate-list li:nth-last-of-type(2) .debate-title', debateTitle);
    test.assertSelectorHasText('.debate-list li:nth-last-of-type(2) .debate-score', '0');
  });

  casper.then(function() {
    var debateText = this.fetchText('.debate-list li:first-of-type .debate-title');
    var debateScore = this.fetchText('.debate-list li:first-of-type .debate-score');
    this.click('.debate-list li:first-of-type .debate');
    test.assertSelectorHasText('.debate.detail .debate-title', debateText);
    test.assertSelectorHasText('.debate.detail .debate-score', debateScore);
  });

  casper.run(function() {
    test.done();
  });
});