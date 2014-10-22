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

// TODO: Server needs to pass through to index.html instead of looking
// for an object endpoint, e.g. /debate/4 should stream contents of index.html.
// Uncommenting these lines will remove the # from urls within the app.
//
// App.Router.reopen({
//   location: 'auto'
// });