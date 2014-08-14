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

  assertCurrent: function(title, score) {
    equal(find(debateDetail + ' .debate-title').text(), title);
    equal(find(debateDetail + ' .debate-score').text(), score);
  },

  assertHasStatements: function() {
    notEqual(find('.statement').length, 0);
  },

  assertLastStatement: function(body, score) {
    equal(find(lastStatement + ' .statement-body').text(), body);
    equal(find(lastStatement + ' .statement-score').text(), score);
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
