App.StatementsCreateRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('debate');
  }
});
