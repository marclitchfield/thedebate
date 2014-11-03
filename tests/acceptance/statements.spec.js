var debates = require('./pages/debates');
var statements = require('./pages/statements');
var responses = require('./pages/responses');

describe('statements page', function() {
  var debateTitle = 'new debate',
      statementBody = 'new statement';

  it('when statement is added to debate', function() {
    browser.get('/');
    debates.add(debateTitle);
    debates.last.click();
    statements.add(statementBody);
  });

  it('  new statement should be at the end of the list', function() {
    expect(statements.last.body()).toEqual(statementBody);
    expect(statements.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new statement', function() {
    statements.last.click();
    expect(responses.debate.title()).toEqual(debateTitle);
    expect(responses.current.body()).toEqual(statementBody);
  });
});