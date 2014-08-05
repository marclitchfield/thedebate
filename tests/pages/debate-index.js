var firstDebate = '.debate-list li:first-of-type a';
var lastDebate = '.debate-list li:nth-last-of-type(2)';

module.exports = function debate_index_page(casper, test) {
  return {
    first: function() {
      return {
        title: casper.fetchText(firstDebate + ' .debate-title'),
        score: casper.fetchText(firstDebate + ' .debate-score')
      };
    },

    submit: function(title) {
      casper.sendKeys('#new-debate', title);
      casper.sendKeys('#new-debate', casper.page.event.key.Enter);
    },

    assertLast: function(title, score) {
      test.assertSelectorHasText(lastDebate + ' .debate-title', title);
      test.assertSelectorHasText(lastDebate + ' .debate-score', '0');
    },

    navigateToFirst: function(callback) {
      var url = casper.getElementAttribute(firstDebate, 'href');
      casper.click(firstDebate);        
      casper.waitForUrl(url, callback);
    }
  };
}