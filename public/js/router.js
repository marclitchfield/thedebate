DebateApp.Router.map(function() {
  this.resource('debates', { path: '/' });
});

DebateApp.DebatesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('debate');
  }
});