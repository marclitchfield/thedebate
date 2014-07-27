casper.test.begin('The Debate homepage', 1, function suite(test) {
  casper.start("http://localhost:9002", function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.then(function() {
    this.capture('tests/captures/homepage.png');
  });

  casper.run(function() {
    test.done();
  });
});