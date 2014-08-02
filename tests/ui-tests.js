casper.test.begin('The Debate homepage', 1, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
  });

  casper.then(function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
  });

  casper.run(function() {
    test.done();
  });
});