module.exports = function debate(element) {
  return {
    click: function() { 
      element.element(by.css('.debate-title')).click();
    },

    title: function() {
      return element.element(by.css('.debate-title')).getText();
    },

    score: function() {
      return element.element(by.css('.debate-score')).getText();
    }
  };
};