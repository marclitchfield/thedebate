casper.test.begin('The Debate homepage', 1, function suite(test) {
  casper.start("http://localhost:9002", function() {
    this.viewport(420, 300);
  });

  casper.then(function() {
    test.assertSelectorHasText('.banner h1', 'The Debate');
    this.captureSelector('tests/captures/actual/homepage.png', 'body', { quality: 50, format: 'png' });
  });

  casper.run(function() {
    test.done();
  });
});