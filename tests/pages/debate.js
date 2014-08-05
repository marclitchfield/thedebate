var debateDetail = '.detail .context .debate';
var firstStatement = '.statements a:first-of-type .statement';
var lastStatement = '.statements a:last-of-type .statement';

module.exports = function debate_page(casper, test) {
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
};