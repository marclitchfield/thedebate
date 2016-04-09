var debateSelector = '.context .debate ';
var statementsSelector = '.statements .statement ';
var debate = require('./debate');
var statement = require('./statement');

module.exports = {
  add: function(body) {
    element(by.css('.new-statement')).click();
    element(by.css('.new-statement-body')).sendKeys(body);
    element(by.id('submit-statement')).click();
  },

  debate: function() {
    return debate(element(by.css(debateSelector)));
  },

  last: function() {
    return statement(element.all(by.css(statementsSelector)).last());
  }
}
