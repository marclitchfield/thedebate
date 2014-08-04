App.DebateController = Ember.ObjectController.extend({
  actions: {
    createStatement: function() {
      var body = this.get('newBody');
      if (!body) { return false; }
      if (!body.trim()) { return; }

      var statement = this.store.createRecord('statement', {
        body: body,
        score: 0,
        support: 0,
        opposition: 0
      });

      this.set('newBody', '');
      this.get('statements').pushObject(statement);
      statement.save();
    }
  }
});
