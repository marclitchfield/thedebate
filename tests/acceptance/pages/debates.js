var debatesSelector = '.debate-list li ';

module.exports = {
  add: function(title) {
    element(by.id('new-debate')).click();
    element(by.id('debate-title')).sendKeys(title);
    element(by.id('submit-debate')).click();
  },

  last: {
    click: function() { 
      element.all(by.css(debatesSelector + '.debate-title')).last().click();
    },
    title: function() {
      return element.all(by.css(debatesSelector + '.debate-title')).last().getText();
    },
    score: function() {
      return element.all(by.css(debatesSelector + '.debate-score')).last().getText();
    }
  }
}
