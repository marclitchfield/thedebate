App.StatementRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('statement', params.statement_id);
  }
});
