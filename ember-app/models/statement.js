App.Statement = DS.Model.extend({
  body: DS.attr('string'),
  score: DS.attr('number'),
  support: DS.attr('number'),
  opposition: DS.attr('number'),
  objection: DS.attr('number'),
  debate: DS.belongsTo('debate', { async: true, inverse: 'statements' }),
  responses: DS.hasMany('response', { async: true, inverse: 'subject' }),
  objections: DS.hasMany('objection', { async: true, inverse: 'subject' })
});
