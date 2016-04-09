var uuid = require('uuid');
var debates = require('./pageObjects/debates');
var statements = require('./pageObjects/statements');
var responses = require('./pageObjects/responses');

describe('responses page', function() {
  var debateTitle, statementBody, responseBody;

  ['support','opposition'].forEach(function(type) {

    it('given a parent statement', function() {
      debateTitle = 'new debate ' + uuid.v4();
      statementBody = 'new statement ' + uuid.v4();

      browser.get('/');
      debates.add(debateTitle);
      debates.last().click();
      statements.add(statementBody);
      statements.last().click();
    });

    it('  when a new ' + type + ' response is added', function() {
      responseBody = 'new ' + type + ' response ' + uuid.v4();
      responses.add(type, responseBody);
    });

    it('  should add ' + type + ' response to end of list', function() {
      expect(responses.last().body()).toEqual(responseBody);
      expect(responses.last().score()).toEqual('0');
    });

    it('  should show response in ' + type + ' list', function() {
      responses.show(type);
      expect(responses.last().body()).toEqual(responseBody);
      expect(responses.last().score()).toEqual('0');
    });

    it('  should be able to navigate to new ' + type + ' response', function() {
      responses.last().click();
      expect(responses.debate().title()).toEqual(debateTitle);
      expect(responses.parent().body()).toEqual(statementBody);
      expect(responses.current().body()).toEqual(responseBody);
    });

    it('  should be able to navigate to parent', function() {
      responses.parent().click();
      expect(responses.current().body()).toEqual(statementBody);
    });

    it('  should have the ' + type + ' response at the end of the list', function() {
      expect(responses.last().body()).toEqual(responseBody);
    });

    it('  when upvoting a ' + type + ' response, should show as upvoted', function() {
      responses.last().upvote();
      expect(responses.last().isUpvoted()).toEqual(true);
      expect(responses.last().score()).toEqual('1');
    });

    it('  when current item is clicked, nothing happens', function() {
      responses.current().click();
      expect(responses.last().body()).toEqual(responseBody);
    });

    // TODO: Fix in Chrome
    // it('  when adding a ' + type + ' response, a body is required', function() {
    //   responses.add(type, '');
    //   expect(responses.submitButton().isEnabled()).toBe(false);
    // });
  });

  // TODO: Fix in Chrome
  // it('when adding a response, a type is required', function() {
  //   responses.cancel();
  //   responses.add('', 'body');
  //   expect(responses.submitButton().isEnabled()).toBe(false);
  // });

});