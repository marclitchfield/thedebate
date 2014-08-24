import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  score: DS.attr('number'),
  support: DS.attr('number'),
  opposition: DS.attr('number'),
  objection: DS.attr('number'),
  debate: DS.belongsTo('debate', { inverse: 'statements' }),
  parent: DS.belongsTo('statement', { inverse: 'responses'}),  
  responses: DS.hasMany('statement', { async: true, inverse: 'parent' }),

  supportStyle: function() {
    return widthStyle(this.get('support'), 7);
  }.property('support'),

  oppositionStyle: function() {
    return widthStyle(this.get('opposition'), 7);
  }.property('opposition'),

  objectionStyle: function() {
    return widthStyle(this.get('objection'), 14);
  }.property('objection')
});

function widthStyle(score, multiplier) {
    return 'width:' + multiplier * Math.log((score || 0) + 1) + '%;';
}
