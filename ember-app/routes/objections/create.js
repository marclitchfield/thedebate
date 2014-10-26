App.ObjectionsCreateRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('statement');
  }
});
