var debates = require('./pages/debates');
var statements = require('./pages/statements');
var responses = require('./pages/responses');

describe('responses page', function() {
  var debateTitle = 'new debate',
      statementBody = 'new statement',
      responseBodies = {
        support: 'new support',
        opposition: 'new opposition',
        objection: 'new objection'
      };

  ['support','opposition','objection'].forEach(function(type) {

    it('when new ' + type + ' response is added to statement', function() {
      browser.get('/');
      debates.add(debateTitle);
      debates.last.click();
      statements.add(statementBody);
      statements.last.click();
      responses.add(type, responseBodies[type]);
    });

    it('  should add ' + type + ' response to end of list', function() {
      expect(responses.last.body()).toEqual(responseBodies[type]);
      expect(responses.last.score()).toEqual('0');
    });

    it('  should show response in ' + type + ' list', function() {
      responses.show(type);
      expect(responses.last.body()).toEqual(responseBodies[type]);
      expect(responses.last.score()).toEqual('0');
    });

    it('  should be able to navigate to new ' + type + ' response', function() {
      responses.last.click();
      expect(responses.debate.title()).toEqual(debateTitle);
      expect(responses.parent.body()).toEqual(statementBody);
      expect(responses.current.body()).toEqual(responseBodies[type]);
    });

    it('  should be able to navigate to parent', function() {
      responses.parent.click();
      expect(responses.current.body()).toEqual(statementBody);
    });

  });

});