var _ = require('lodash');

module.exports = function debate(element) {
  return {
    click: function() {
      element.click();
    },

    title: function() {
      return element.clone().element(by.css('.debate-title')).getText();
    },

    score: function() {
      return element.element(by.css('.debate-score')).getText();
    }
  };
};