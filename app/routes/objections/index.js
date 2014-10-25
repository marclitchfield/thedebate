App.ObjectionsIndexRoute = Ember.Route.extend({
  model: function() {
    var statement = this.modelFor('statement');
    return statement instanceof App.Objection ? this.modelFor('objection') : statement;
  }
});
