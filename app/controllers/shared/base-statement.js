App.BaseStatementController = Ember.ObjectController.extend({
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

      var self = this;
      statement.set('debate', self._getDebate(parent));
      statement.set('parent', self._getParent(parent));

      self._getCollection(parent).then(function(collection) {
        collection.pushObject(statement);
        return statement.save();
      }).then(function() {
        self.set('newBody', '');
        self._transitionAfterSave();
      });
    }
  }
});
