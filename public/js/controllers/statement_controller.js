App.StatementController = Ember.ObjectController.extend({
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
        debate: parentStatement.get('debate')
      });

      this.set('newBody', '');
      parentStatement.get('responses').pushObject(statement);
      App.store.commit();
    }
  }
});
