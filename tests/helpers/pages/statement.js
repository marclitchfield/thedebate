var debateDetail = '.detail .context .debate';
var statementDetail = '.detail .context .statement.current';
var firstResponse = '.responses a:first-of-type .statement';
var lastResponse = '.responses a:last-of-type .statement';
var parentStatement = '.detail .context a:last-of-type .statement';
var grandparentStatement = '.detail .context a:nth-last-of-type(2) .statement';

function getStatement(selector) {
  return {
    body: find(selector + ' .statement-body').text(),
    score: find(selector + ' .statement-score').text()
  };
}

export default {
  currentDebate: function() {
    return {
      title: find(debateDetail + ' .debate-title').text(),
      score: find(debateDetail + ' .debate-score').text()
    };
  },

  current: function() {
    return getStatement(statementDetail);
  },

  firstResponse: function() {
    return getStatement(firstResponse);
  },

  lastResponse: function() {
    return getStatement(lastResponse);
  },    

  submitResponse: function(body) {
    fillIn('#statement-body', body);
    click('#submit-statement');
  },

  visitFirstResponse: function() {
    click(firstResponse);
  },

  visitLastResponse: function() {
    click(lastResponse);
  },

  assertDebate: function(debate) {
    equal(find(debateDetail + ' .debate-title').text(), debate.title);
    equal(find(debateDetail + ' .debate-score').text(), debate.score);
  },

  assertCurrent: function(statement) {
    equal(find(statementDetail + ' .statement-body').text(), statement.body);
    equal(find(statementDetail + ' .statement-score').text(), statement.score);
  },

  assertParent: function(statement) {
    equal(find(parentStatement + ' .statement-body').text(), statement.body);
    equal(find(parentStatement + ' .statement-score').text(), statement.score);
  },

  assertGrandparent: function(statement) {
    equal(find(grandparentStatement + ' .statement-body').text(), statement.body);
    equal(find(grandparentStatement + ' .statement-score').text(), statement.score);
  },

  assertLastResponse: function(response) {
    equal(find(lastResponse + ' .statement-body').text(), response.body);
    equal(find(lastResponse + ' .statement-score').text(), response.score);
  },

  assertHasResponses: function() {
    notEqual(find('.responses .statement').length, 0);
  }  
};
