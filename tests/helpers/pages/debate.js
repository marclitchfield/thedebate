var debateDetail = '.detail .context .debate';
var firstStatement = '.statements a:first-of-type .statement';
var lastStatement = '.statements a:last-of-type .statement';

export default {
  current: function() {
    return {
      title: find(debateDetail + ' .debate-title').text(),
      score: find(debateDetail + ' .debate-score').text()
    };
  },

  assertCurrent: function(debate) {
    equal(find(debateDetail + ' .debate-title').text(), debate.title);
    equal(find(debateDetail + ' .debate-score').text(), debate.score);
  },

  assertHasStatements: function() {
    notEqual(find('.statement').length, 0);
  },

  assertLastStatement: function(statement) {
    equal(find(lastStatement + ' .statement-body').text(), statement.body);
    equal(find(lastStatement + ' .statement-score').text(), statement.score);
  },

  submitStatement: function(body) {
    fillIn('#new-statement', body);
    click('#submit-statement');
    wait();
  },

  firstStatement: function() {
    return {
      body: find(firstStatement + ' .statement-body').text(),
      score: find(firstStatement + ' .statement-score').text()
    };
  },

  visitFirstStatement: function() {
    click(firstStatement);
    wait();
  }
};
