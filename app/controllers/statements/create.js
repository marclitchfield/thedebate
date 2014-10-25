App.StatementsCreateController = App.BaseStatementCreateController.extend({
  modelType: function() { 
    return 'statement';
  },

  create: function(newStatement, subject) {
    return subject.get('statements').then(function(statements) {
      newStatement.set('debate', subject);
      statements.pushObject(newStatement);
      return newStatement.save();
    });
  },

  transitionAfterSave: function() {
    this.transitionToRoute('debate');
  }
});
