var debates = require('./pageObjects/debates');
var statements = require('./pageObjects/statements');
var responses = require('./pageObjects/responses');

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
      debates.last().click();
      statements.add(statementBody);
      statements.last().click();
      responses.add(type, responseBodies[type]);
    });

    it('  should add ' + type + ' response to end of list', function() {
      expect(responses.last().body()).toEqual(responseBodies[type]);
      expect(responses.last().score()).toEqual('0');
    });

    it('  should be able to upvote ' + type + ' response', function() {
      responses.last().upvote();
      expect(responses.last().isUpvoted()).toEqual(true);
    });

    it('  should be able to undo upvote', function() {
      responses.last().upvote();
      expect(responses.last().isUpvoted()).toEqual(false);
    });

    it('  should show response in ' + type + ' list', function() {
      responses.show(type);
      expect(responses.last().body()).toEqual(responseBodies[type]);
      expect(responses.last().score()).toEqual('0');
    });

    it('  should be able to navigate to new ' + type + ' response', function() {
      responses.last().click();
      expect(responses.debate().title()).toEqual(debateTitle);
      expect(responses.parent().body()).toEqual(statementBody);
      expect(responses.current().body()).toEqual(responseBodies[type]);
    });

    it('  should be able to navigate to parent', function() {
      responses.parent().click();
      expect(responses.current().body()).toEqual(statementBody);
    });

  });

  it('when adding a response, a body is required', function() {
    responses.add('support', '');
    expect(responses.submitButton().isEnabled()).toBe(false);
  });

  it('  should validate a new response has a type', function() {
    responses.cancel();
    responses.add('', 'body');
    expect(responses.submitButton().isEnabled()).toBe(false);
  });


});