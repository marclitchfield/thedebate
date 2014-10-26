App.Router.map(function() {
  this.resource('debates', { path: '/' }, function() {
    this.resource('debate', { path: '/debate/:debate_id' }, function() {
      this.resource('statements', function() {
        this.route('create');
      });
    });
  });

  this.resource('statement', { path: '/statement/:statement_id' }, function() {
    this.resource('responses', function() {
      this.route('create');
    });
    this.resource('objections', function() {
      this.route('create');
    });
  });
});

App.Router.reopen({
  location: 'auto'
});