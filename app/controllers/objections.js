App.ObjectionsController = App.BaseStatementController.extend({
  _getDebate: function(parentStatement) {
    return parentStatement.get('debate');
  },

  _getParent: function(parentStatement) {
    return parentStatement;
  },

  _getCollection: function(parentStatement) {
    return parentStatement.get('objections');
  },

  _transitionAfterSave: function() {
    this.transitionToRoute('objections');
  }
});
