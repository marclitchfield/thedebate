App.ResponsesCreateController = App.BaseStatementCreateController.extend({
  modelType: function() { 
    return 'response';
  },

  create: function(newStatement, subject) {
    return subject.get('responses').then(function(responses) {
      newStatement.set('subject', subject);
      responses.pushObject(newStatement);
      return newStatement.save();
    });
  },

  transitionAfterSave: function() {
    this.transitionToRoute('responses');
  }
});