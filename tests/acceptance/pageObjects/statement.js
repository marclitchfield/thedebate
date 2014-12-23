module.exports = function statement(element) {
  return {
    click: function() {
      element.element(by.css('.statement-body')).click();
    },

    body: function() {
      return element.element(by.css('.statement-body')).getText()
    },

    score: function() {
      return element.element(by.css('.statement-score')).getText();
    },

    upvote: function() {
      element.element(by.css('.statement-vote button')).click();
    },

    isUpvoted: function() {
      return element.element(by.css('.statement-vote button')).getAttribute('class').then(function(classes) {
        return classes.indexOf('support') !== -1;
      });
    }
  };
};