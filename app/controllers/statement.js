(function() {
  App.StatementController = Ember.ObjectController.extend({
    supportStyle: function() {
      return widthStyle(this.get('support'), 7);
    }.property('supportStyle'),

    oppositionStyle: function() {
      return widthStyle(this.get('opposition'), 7);
    }.property('oppositionStyle'),

    objectionStyle: function() {
      return widthStyle(this.get('objection'), 14);
    }.property('objectionStyle')
  });  

  function widthStyle(score, multiplier) {
    return 'width:' + multiplier * Math.log((score || 0) + 1) + '%;';
  }  
})();