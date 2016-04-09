module.exports = {
  add: function(body) {
    element(by.css('.new-response')).click();
    element(by.css('label.objection')).click();
    element(by.linkText('Logic')).click();

    element(by.css('input[value="posthoc"]')).element(by.xpath('ancestor::label')).click();
    element(by.css('.objection-type-detail .new-statement-body')).sendKeys(body);

    element(by.id('submit-statement')).click();
  }
};