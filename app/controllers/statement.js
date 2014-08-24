import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    createResponse: function(parentStatement) {
      var body = this.get('newBody');
      if (!body) { return false; }
      if (!body.trim()) { return; }

      var statement = this.store.createRecord('statement', {
        body: body,
        score: 0,
        support: 0,
        opposition: 0,
        debate: parentStatement.get('debate'),
        parent: parentStatement
      });

      this.set('newBody', '');
      parentStatement.get('responses').pushObject(statement);
      statement.save();
    }
  },

  supportStyle: function() {
    return widthStyle(this.get('support'), 7);
  },

  oppositionStyle: function() {
    return widthStyle(this.get('opposition'), 7);
  },

  objectionStyle: function() {
    return widthStyle(this.get('objection'), 14);
  }

});

function widthStyle(score, multiplier) {
    return 'width:' + multiplier * Math.log((score || 0) + 1) + '%;';
}
