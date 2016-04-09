var uuid = require('uuid');
var debates = require('./pageObjects/debates');
var statements = require('./pageObjects/statements');
var responses = require('./pageObjects/responses');

describe('objections page', function() {
  var debateTitle, statementBody, responseBody;

  it('given a parent statement', function() {
    debateTitle = 'new debate ' + uuid.v4();
    statementBody = 'new statement ' + uuid.v4();

    browser.get('/');
    debates.add(debateTitle);
    debates.last().click();
    statements.add(statementBody);
    statements.last().click();
  });

  ['edit','junk','logic'].forEach(function(objectionType) {

    it('  when a new ' + objectionType + ' objection is added', function() {
      objectionBody = 'new ' + objectionType + ' objection ' + uuid.v4();
      responses.objections[objectionType].add(objectionBody);
    });

    it('    should add ' + objectionType + ' objection to end of list', function() {
      expect(responses.last().body()).toEqual(objectionBody);
      expect(responses.last().score()).toEqual('0');
    });

    it('    should show ' + objectionType + ' objection in objections list', function() {
      responses.show('objection');
      expect(responses.last().body()).toEqual(objectionBody);
      expect(responses.last().score()).toEqual('0');
    });

    it('    should be able to navigate to new ' + objectionType + ' objection', function() {
      responses.last().click();
      expect(responses.debate().title()).toEqual(debateTitle);
      expect(responses.parent().body()).toEqual(statementBody);
      expect(responses.current().body()).toEqual(objectionBody);
    });

    it('    should be able to navigate to parent of ' + objectionType + ' objection', function() {
      responses.parent().click();
      expect(responses.current().body()).toEqual(statementBody);
    });

    it('    should have the ' + objectionType + ' objection at the end of the list', function() {
      expect(responses.last().body()).toEqual(objectionBody);
    });

    it('    when upvoting a ' + objectionType + ' objection, should show as upvoted', function() {
      responses.last().upvote();
      expect(responses.last().isUpvoted()).toEqual(true);
      expect(responses.last().score()).toEqual('1');
    });

    it('    when current item is clicked, nothing happens', function() {
      responses.current().click();
      expect(responses.last().body()).toEqual(objectionBody);
    });

  });

});