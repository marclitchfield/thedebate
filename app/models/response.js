App.Response = App.Statement.extend({
  subject: DS.belongsTo('statement', { async: true, inverse: 'responses' })
});
