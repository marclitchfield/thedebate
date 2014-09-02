import Ember from 'ember';

export default Ember.ObjectController.extend({
  init: function() {
    this.set('newBody', '');
  },
  actions: {
    create: function(parentDebate) {
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
      statement.set('debate', parentDebate);
      return this.get('statements').then(function(statements) {
        statements.pushObject(statement);
        return statement.save();
      }).then(function() {
        self.set('newBody', '');
        self.transitionToRoute('debate');
      });
    }
  }
});
