var debateSelector = '.context .debate ';
var statementsSelector = '.statements .statement ';

module.exports = {
  add: function(body) {
    element(by.css('.new-statement')).click();
    element(by.id('statement-body')).sendKeys(body);
    element(by.id('submit-statement')).click();
  },

  debate: {
    title: function() {
      return element(by.css(debateSelector + '.debate-title')).getText();
    }
  },

  last: {
    click: function() {
      element.all(by.css(statementsSelector + '.statement-body')).last().click();
    },

    body: function() {
      return element.all(by.css(statementsSelector + '.statement-body')).last().getText()
    },

    score: function() {
      return element.all(by.css(statementsSelector + '.statement-score')).last().getText();
    }
  }
}
