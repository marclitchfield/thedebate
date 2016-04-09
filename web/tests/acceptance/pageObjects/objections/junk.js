module.exports = {
  add: function(body) {
    element(by.css('.new-response')).click();
    element(by.css('label.objection')).click();
    element(by.linkText('Junk')).click();

    element(by.model('junkChecked')).click();

    if (body) {
      element(by.css('.objection-type-detail .new-statement-body')).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
      element(by.css('.objection-type-detail .new-statement-body')).sendKeys(body);
    }

    element(by.id('submit-statement')).click();
  }
};