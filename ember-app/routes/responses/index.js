App.ResponsesIndexRoute = Ember.Route.extend({
  model: function() {
    var statement = this.modelFor('statement');
    return statement instanceof App.Response ? this.modelFor('response') : statement;
  }
});
