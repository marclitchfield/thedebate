App.Objection = App.Statement.extend({
  subject: DS.belongsTo('statement', { async: true, inverse: 'objections' })
});