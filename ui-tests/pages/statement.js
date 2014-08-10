var debateDetail = '.detail .context .debate';
var statementDetail = '.detail .context .statement.current';
var firstResponse = '.responses a:first-of-type .statement';
var lastResponse = '.responses a:last-of-type .statement';
var parentStatement = '.detail .context a:last-of-type .statement';
var grandparentStatement = '.detail .context a:nth-last-of-type(2) .statement';

function getStatement(selector) {
    return {
      body: casper.fetchText(selector + ' .statement-body'),
      score: casper.fetchText(selector + ' .statement-score')
    };
}

module.exports = function statement_page(casper, test) {
  return {
    currentDebate: function() {
      return {
        title: casper.fetchText(debateDetail + ' .debate-title'),
        score: casper.fetchText(debateDetail + ' .debate-score')
      };
    },

    current: function() {
      return getStatement(statementDetail);
    },

    assertDebate: function(title, score) {
      test.assertSelectorHasText(debateDetail + ' .debate-title', title);
      test.assertSelectorHasText(debateDetail + ' .debate-score', score);
    },

    assertCurrent: function(body, score) {
      test.assertSelectorHasText(statementDetail + ' .statement-body', body);
      test.assertSelectorHasText(statementDetail + ' .statement-score', score);
    },

    assertParent: function(body, score) {
      test.assertSelectorHasText(parentStatement + ' .statement-body', body);
      test.assertSelectorHasText(parentStatement + ' .statement-score', score);
    },

    assertGrandparent: function(body, score) {
      test.assertSelectorHasText(grandparentStatement + ' .statement-body', body);
      test.assertSelectorHasText(grandparentStatement + ' .statement-score', score);
    },

    submitResponse: function(body) {
      casper.sendKeys('#new-response', body);
      casper.click('#submit-response');
    },

    firstResponse: function() {
      return getStatement(firstResponse);
    },

    lastResponse: function() {
      return getStatement(lastResponse);
    },    

    assertLastResponse: function(body, score) {
      test.assertSelectorHasText(lastResponse + ' .statement-body', body);
      test.assertSelectorHasText(lastResponse + ' .statement-score', score);
    },

    assertHasResponses: function() {
      test.assertEval(function() { return __utils__.findAll('.responses .statement').length > 0; });
    },

    navigateToFirst: function(callback) {
      var url = casper.getElementAttribute(firstResponse, 'href');
      casper.click(firstResponse);
      casper.waitForUrl(url, callback);
    },

    navigateToLast: function(callback) {
      var url = casper.getElementAttribute(lastResponse, 'href');
      casper.click(lastResponse);
      casper.waitForUrl(url, callback);
    }      
  };
};