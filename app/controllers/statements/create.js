import Ember from 'ember';
import Debate from '../../models/debate';
import Statement from '../../models/statement';

export default Ember.ObjectController.extend({
  init: function() {
    this.set('newBody', '');
  },
  actions: {
    create: function(parent) {
      var body = this.get('newBody');
      if (!body) { return; }
      if (!body.trim()) { return; }

      var statement = this.store.createRecord('statement', {
        body: body,
        score: 0,
        support: 0,
        opposition: 0
      });

      if (parent instanceof Statement) {
        statement.set('debate', parent.get('debate'));
        statement.set('parent', parent);
        parent.get('responses').pushObject(statement);
      } else if (parent instanceof Debate) {
        statement.set('debate', parent);
        this.get('statements').pushObject(statement);
      } else {
        throw Error('Unsupported model type: ', JSON.stringify(parent));
      }

      this.set('newBody', '');
      statement.save();
    }
  }
});
