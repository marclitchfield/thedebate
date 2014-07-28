casper.test.begin('The Debate homepage', 1, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(800, 600);
  });

  casper.then(function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
    this.capture('tests/captures/actual/homepage.png');
  });

  casper.run(function() {
    test.done();
  });
});