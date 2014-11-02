var debates = require('./pages/debates');
var statements = require('./pages/statements');
var responses = require('./pages/responses');

describe('responses page', function() {
  it('when new response is added to statement', function() {
    browser.get('/');
    debates.add('new debate');
    debates.last.click();
    statements.add('new statement');
    statements.last.click();
    responses.add('response', 'new response');
  });

  it('  should add response to end of list', function() {
    responses.show('responses');
    expect(responses.last.body()).toEqual('new response');
    expect(responses.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new response', function() {
    responses.last.click();
    expect(responses.debate.title()).toEqual('new debate');
    expect(responses.parent.body()).toEqual('new statement');
    expect(responses.current.body()).toEqual('new response');
  });

  it('  should be able to navigate to parent', function() {
    responses.parent.click();
    expect(responses.current.body()).toEqual('new statement');
  });

  it('when new objection is added to debate', function() {
    responses.add('objection', 'new objection');
    responses.show('objections');
  });

  it('  should add objection to end of list', function() {
    expect(responses.last.body()).toEqual('new objection');
    expect(responses.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new objection', function() {
    responses.last.click();
    expect(responses.debate.title()).toEqual('new debate');
    expect(responses.parent.body()).toEqual('new statement');
    expect(responses.current.body()).toEqual('new objection');
  });  
});