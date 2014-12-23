var _ = require('lodash');

module.exports = function statement(element) {
  return _.assign(element, {
    body: function() {
      return element.all(by.css('.statement-body')).last().getText()
    },

    score: function() {
      return element.all(by.css('.statement-score')).last().getText();
    }    
  });
};