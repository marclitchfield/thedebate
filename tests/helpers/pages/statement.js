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

  assertDebate: function(title, score) {
    equal(find(debateDetail + ' .debate-title').text(), title);
    equal(find(debateDetail + ' .debate-score').text(), score);
  },

  assertCurrent: function(body, score) {
    equal(find(statementDetail + ' .statement-body').text(), body);
    equal(find(statementDetail + ' .statement-score').text(), score);
  },

  assertParent: function(body, score) {
    equal(find(parentStatement + ' .statement-body').text(), body);
    equal(find(parentStatement + ' .statement-score').text(), score);
  },

  assertGrandparent: function(body, score) {
    equal(find(grandparentStatement + ' .statement-body').text(), body);
    equal(find(grandparentStatement + ' .statement-score').text(), score);
  },

  submitResponse: function(body) {
    fillIn('#new-response', body);
    click('#submit-response');
  },

  firstResponse: function() {
    return getStatement(firstResponse);
  },

  lastResponse: function() {
    return getStatement(lastResponse);
  },    

  assertLastResponse: function(body, score) {
    equal(find(lastResponse + ' .statement-body').text(), body);
    equal(find(lastResponse + ' .statement-score').text(), score);
  },

  assertHasResponses: function() {
    notEqual(find('.responses .statement').length, 0);
  },

  visitFirstResponse: function() {
    click(firstResponse);
  },

  visitLastResponse: function(callback) {
    click(lastResponse);
  }      
};
