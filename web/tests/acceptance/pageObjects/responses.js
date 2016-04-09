var debateSelector = '.context .debate ';
var chainSelector = '.context .chain .statement ';
var currentSelector = '.context .current .statement ';
var statementsSelector = '.statements .statement ';
var debate = require('./debate');
var statement = require('./statement');

module.exports = {
  objections: {
    edit: require('./objections/edit'),
    junk: require('./objections/junk'),
    logic: require('./objections/logic')
  },

  add: function(type, body) {
    element(by.css('.new-response')).click();
    if (type) {
      element(by.css('label.' + type)).click();
    }
    if (body) {
      element(by.css('.response-form.' + type + ' .new-statement-body')).sendKeys(body);
    }
    this.submitButton().click();
  },

  submitButton: function() {
    return element(by.id('submit-statement'));
  },

  cancel: function() {
    element(by.id('cancel-submit')).click();
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
};