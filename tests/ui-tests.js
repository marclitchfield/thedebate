casper.test.begin('The Debate homepage', 4, function suite(test) {
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
    test.assertSelectorHasText('.debate-list li:nth-last-of-type(2) .title', debateTitle);
    test.assertSelectorHasText('.debate-list li:nth-last-of-type(2) .score', '0');
  });

  casper.then(function() {
    var debateText = this.fetchText('.debate-list li:first-of-type .title');
    this.click('.debate-list li:first-of-type .debate');
    test.assertSelectorHasText('#debate-title', debateText);
  })

  casper.run(function() {
    test.done();
  });
});