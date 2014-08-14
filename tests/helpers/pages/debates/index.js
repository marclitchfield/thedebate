var firstDebate = '.debate-list li:first-of-type a';
var lastDebate = '.debate-list li:nth-last-of-type(2)';

export default {
  first: function() {
    return {
      title: find(firstDebate + ' .debate-title').text(),
      score: find(firstDebate + ' .debate-score').text()
    };
  },

  submit: function(title) {
    fillIn('#new-debate', title);
    keyEvent('#new-debate', 'keypress', 13);
    wait();
  },

  assertLast: function(debate) {
    equal(find(lastDebate + ' .debate-title').text(), debate.title);
    equal(find(lastDebate + ' .debate-score').text(), debate.score);
  },

  visitFirstDebate: function() {
    click(firstDebate);
    wait();
  }
};
