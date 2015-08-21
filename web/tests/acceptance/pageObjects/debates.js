var debatesSelector = '.debate-list li ';
var debate = require('./debate');

module.exports = {
  add: function(title) {
    element(by.id('new-debate')).click();
    element(by.id('debate-title')).sendKeys(title);
    element(by.id('submit-debate')).click();
  },

  last: function() {
    return debate(element.all(by.css(debatesSelector)).last());
  }
}
