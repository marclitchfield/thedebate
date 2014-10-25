App.BaseStatementCreateController = Ember.ObjectController.extend({
  init: function() {
    this.set('newBody', '');
  },
  actions: {
    create: function(subject) {
      var body = this.get('newBody');
      if (!body) { return false; }
      if (!body.trim()) { return false; }

      var newStatement = this.store.createRecord(this.modelType(), {
        body: body,
        score: 0,
        support: 0,
        opposition: 0
      });

      var self = this;
      this.create(newStatement, subject).then(function() {
        self.set('newBody', '');
        self.transitionAfterSave();
      });
    }
  }
});
