var debates = require('./pages/debates');
var statements = require('./pages/statements');

describe('debates page', function() {
  var debateTitle = 'new debate';

  it('when new debate is added', function() {
    browser.get('/');
    debates.add(debateTitle);
  });

  it('  new debate should be at the end of the list', function() {
    expect(debates.last.title()).toEqual(debateTitle);
    expect(debates.last.score()).toEqual('0');
  });

  it('  should be able to navigate to new debate', function() {
    debates.last.click();
    expect(statements.debate.title()).toEqual(debateTitle);
  });
});