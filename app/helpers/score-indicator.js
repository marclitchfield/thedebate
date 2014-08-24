import Ember from 'ember';

var multiplier = 7;

export default Ember.Handlebars.makeBoundHelper(function(model, property) {
  var markup = '<div class="score ' + property + '" ';
  markup += 'style="' + widthStyle(model, property) + '">'; 
  markup += '</div>';
  return new Ember.Handlebars.SafeString(markup);
});

function widthStyle(model, property) {
  var score = model.get(property);
  return 'width:' + multiplier * Math.log((score || 0) + 1) + '%;';
}