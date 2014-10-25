App.ObjectionsCreateController = App.BaseStatementCreateController.extend({
  modelType: function() { 
    return 'objection';
  },

  create: function(newStatement, subject) {
    return subject.get('objections').then(function(objections) {
      newStatement.set('subject', subject);
      objections.pushObject(newStatement);
      return newStatement.save();
    });
  },

  transitionAfterSave: function() {
    this.transitionToRoute('objections');
  }
});
