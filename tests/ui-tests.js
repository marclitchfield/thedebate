casper.test.begin('The Debate homepage', 1, function suite(test) {
  casper.start("http://localhost:9002", function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
    this.capture('tests/captures/actual/homepage.png');
  });

  casper.run(function() {
    test.done();
  });
});