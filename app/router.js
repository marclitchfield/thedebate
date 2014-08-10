import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ThedebateENV.locationType
});

Router.map(function() {
  this.resource('debates', { path: '/' }, function() {
    this.resource('debate', { path: 'debate/:debate_id' });
  });

  this.resource('statement', { path: 'statement/:statement_id'});  
});

export default Router;
