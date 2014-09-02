import Ember from 'ember';

export default Ember.ObjectController.extend({
  init: function() {
    this.set('newBody', '');
  },
  actions: {
    create: function(parentStatement) {
      var body = this.get('newBody');
      if (!body) { return; }
      if (!body.trim()) { return; }

      var statement = this.store.createRecord('statement', {
        body: body,
        score: 0,
        support: 0,
        opposition: 0
      });

      var self = this;
      statement.set('debate', parentStatement.get('debate'));
      statement.set('parent', parentStatement);

      return parentStatement.get('responses').then(function(responses) {
        responses.pushObject(statement);
        return statement.save();
      }).then(function() {
        self.set('newBody', '');
        self.transitionToRoute('responses');
      });
    }
  }
});
