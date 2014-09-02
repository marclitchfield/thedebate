import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ThedebateENV.locationType
});

Router.map(function() {
  this.resource('debates', { path: '/' }, function() {
    this.resource('debate', { path: '/debate/:debate_id' }, function() {
      this.resource('statements', function() {
        this.route('create');
      });
    });
  });

  this.resource('statement', { path: '/statement/:statement_id' }, function() {
    this.resource('responses', { path: 'responses' }, function() {
      this.route('create');
    });
    this.resource('objections', function() {
      this.route('create');
    });
  });

});

export default Router;
