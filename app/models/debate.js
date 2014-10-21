App.Debate = DS.Model.extend({
  title: DS.attr('string'),
  score: DS.attr('number'),
  statements: DS.hasMany('statement', { async: true, inverse: 'debate' })
});

