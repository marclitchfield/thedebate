var firstDebate = '.debate-list li:first-of-type a';
var lastDebate = '.debate-list li:last';

export default {
  first: function() {
    return {
      title: find(firstDebate + ' .debate-title').text(),
      score: find(firstDebate + ' .debate-score').text()
    };
  },

  submit: function(title) {
    fillIn('#debate-title', title);
    click('#submit-debate');
  },

  visitFirstDebate: function() {
    click(firstDebate);
    wait();
  },

  assertLast: function(debate) {
    equal(find(lastDebate + ' .debate-title').text(), debate.title);
    equal(find(lastDebate + ' .debate-score').text(), debate.score);
  }
};
