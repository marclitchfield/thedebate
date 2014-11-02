var debates = require('./pages/debates');
var statements = require('./pages/statements');
var responses = require('./pages/responses');

describe('statements page', function() {
  it('when statement is added to debate', function() {
    browser.get('/');
    debates.add('new debate');
    debates.last.click();
    statements.add('new statement');
  });

  it('  new statement should be at the end of the list', function() {
    expect(statements.last.body()).toEqual('new statement');
    expect(statements.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new statement', function() {
    statements.last.click();
    expect(responses.debate.title()).toEqual('new debate');
    expect(responses.current.body()).toEqual('new statement');
  });
});