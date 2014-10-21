App.DebateRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('debate', params.debate_id);
  }  
});
