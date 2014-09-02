import CreateStatementController from '../shared/create-statement';

export default CreateStatementController.extend({
  _getDebate: function(parentDebate) {
    return parentDebate;
  },

  _getParent: function() {
    return undefined;
  },

  _getCollection: function() {
    return this.get('statements');
  },

  _transitionAfterSave: function() {
    this.transitionToRoute('debate');
  }
});