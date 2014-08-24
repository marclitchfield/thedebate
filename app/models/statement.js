import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  score: DS.attr('number'),
  support: DS.attr('number'),
  opposition: DS.attr('number'),
  objection: DS.attr('number'),
  debate: DS.belongsTo('debate', { inverse: 'statements' }),
  parent: DS.belongsTo('statement', { inverse: 'responses'}),  
  responses: DS.hasMany('statement', { async: true, inverse: 'parent' })
});