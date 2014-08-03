DebateApp.Router.map(function() {
  this.resource('debates', { path: '/' }, function() {

  });
});

DebateApp.DebatesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('debate');
  }
});