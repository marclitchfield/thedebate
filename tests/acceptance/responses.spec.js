var debates = require('./pages/debates');
var statements = require('./pages/statements');
var responses = require('./pages/responses');

describe('responses page', function() {
  var debateTitle = 'new debate',
      statementBody = 'new statement',
      responseBody = 'new response',
      objectionBody = 'new objection';

  it('when new response is added to statement', function() {
    browser.get('/');
    debates.add(debateTitle);
    debates.last.click();
    statements.add(statementBody);
    statements.last.click();
    responses.add('response', responseBody);
  });

  it('  should add response to end of list', function() {
    responses.show('responses');
    expect(responses.last.body()).toEqual(responseBody);
    expect(responses.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new response', function() {
    responses.last.click();
    expect(responses.debate.title()).toEqual(debateTitle);
    expect(responses.parent.body()).toEqual(statementBody);
    expect(responses.current.body()).toEqual(responseBody);
  });

  it('  should be able to navigate to parent', function() {
    responses.parent.click();
    expect(responses.current.body()).toEqual(statementBody);
  });

  it('when new objection is added to debate', function() {
    responses.add('objection', objectionBody);
    responses.show('objections');
  });

  it('  should add objection to end of list', function() {
    expect(responses.last.body()).toEqual(objectionBody);
    expect(responses.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new objection', function() {
    responses.last.click();
    expect(responses.debate.title()).toEqual(debateTitle);
    expect(responses.parent.body()).toEqual(statementBody);
    expect(responses.current.body()).toEqual(objectionBody);
  });  
});