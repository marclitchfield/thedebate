var debateSelector = '.context .debate ';
var chainSelector = '.context .chain .statement ';
var currentSelector = '.context .current .statement ';
var statementsSelector = '.statements .statement ';
var debate = require('./debate');
var statement = require('./statement');

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

  debate: function() {
    return debate(element(by.css(debateSelector)));
  },

  parent: function() {
    return statement(element.all(by.css(chainSelector)).last());
  },

  current: function() {
    return statement(element.all(by.css(currentSelector)).last());
  },

  last: function() {
    return statement(element.all(by.css(statementsSelector)).last());
  }
}
