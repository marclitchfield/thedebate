import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createDebate: function() {
      var title = this.get('newTitle');
      if (!title) { return false; }
      if (!title.trim()) { return; }

      var debate = this.store.createRecord('debate', {
        title: title,
        score: 0
      });

      this.set('newTitle', '');
      debate.save();
    }
  }    
});
