import CreateStatementController from '../shared/create-statement';

export default CreateStatementController.extend({
  _getDebate: function(parentStatement) {
    return parentStatement.get('debate');
  },

  _getParent: function(parentStatement) {
    return parentStatement;
  },

  _getCollection: function(parentStatement) {
    return parentStatement.get('responses');
  },

  _transitionAfterSave: function() {
    this.transitionToRoute('responses');
  }
});