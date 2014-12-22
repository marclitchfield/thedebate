var debateSelector = '.context .debate ';
var chainSelector = '.context .chain .statement ';
var currentSelector = '.context .current .statement ';
var statementsSelector = '.statements .statement ';

module.exports = {
  add: function(type, body) {
    element(by.css('.new-response')).click();
    element(by.css('button.' + type)).click();
    element(by.id('statement-body')).sendKeys(body);
    element(by.id('submit-statement')).click();
  },

  show: function(type) {
    element(by.css('.show-' + type)).click();
  },

  debate: {
    title: function() { 
      return element(by.css(debateSelector + '.debate-title')).getText();
    }
  },

  parent: {
    body: function() {
      return element.all(by.css(chainSelector + '.statement-body')).last().getText();
    },

    click: function() {
      element.all(by.css(chainSelector + '.statement-body')).last().click();
    }
  },

  current: {
    body: function() {
      return element.all(by.css(currentSelector + '.statement-body')).last().getText();
    }
  },

  last: {
    body: function() {
      return element.all(by.css(statementsSelector + '.statement-body')).last().getText()
    },

    score: function() {
      return element.all(by.css(statementsSelector + '.statement-score')).last().getText();
    },

    click: function() {
      element.all(by.css(statementsSelector + '.statement-body')).last().click();
    }
  }
}
