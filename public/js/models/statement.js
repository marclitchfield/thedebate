(function() {

  App.Statement = DS.Model.extend({
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

  App.Statement.FIXTURES = [];

  function widthStyle(score, multiplier) {
    return 'width:' + multiplier * Math.log((score || 0) + 1) + '%;';
  }

  var statements = [
    'Lucas ipsum dolor sit amet wyl jusik geonosian elomin bane wicket tchuukthai elrood droid chadra-fan. Solo snivvian whitesun baba cracken shawda grievous. Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar',
    'Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.',
    'Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric.',
    'Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.',
    'Dengar antonio calrissian kubaz obi-wan mon shistavanen antilles. Hissa senesca draethos draethos. Maarek shawda valorum shadda askajian gunray whiphid kubaz. Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.',
    'Lucas ipsum dolor sit amet wyl jusik geonosian elomin bane wicket tchuukthai elrood droid chadra-fan. Solo snivvian whitesun baba cracken shawda grievous. Dengar antonio calrissian kubaz obi-wan mon shistavanen antilles. Hissa senesca draethos draethos. Maarek shawda valorum shadda askajian gunray whiphid kubaz. Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.',
    'Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Lucas ipsum dolor sit amet wyl jusik geonosian elomin bane wicket tchuukthai elrood droid chadra-fan. Solo snivvian whitesun baba cracken shawda grievous. Dengar antonio calrissian kubaz obi-wan mon shistavanen antilles. Hissa senesca draethos draethos. Maarek shawda valorum shadda askajian gunray whiphid kubaz. Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.',
    'Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Lucas ipsum dolor sit amet wyl jusik geonosian elomin bane wicket tchuukthai elrood droid chadra-fan. Solo snivvian whitesun baba cracken shawda grievous. Dengar antonio calrissian kubaz obi-wan mon shistavanen antilles. Hissa senesca draethos draethos. Maarek shawda valorum shadda askajian gunray whiphid kubaz. Felth chommell hoth hutta r4-p17. Pavan thrawn boss kessel obi-wan boba tarasin anakin raynar Yuzzum aparo roan nadon shistavanen. Jamillia kastolar kota skywalker muzzer. Lama stass zhell gendai. Organa vima-da-boda cliegg fode bren ric. Ventress darth yowza gizka ubb danni boz leia. Hutt -lom darth qrygg jabba jar hallotan. Bib lars darth gamorrean aruzan ybith.'
  ];

  function makeStatement(debateId, level) {
    var statement = { 
      id: App.Statement.FIXTURES.length + 1,
      debate: debateId,
      responses: [],
      score: Math.floor(Math.random()*1000), 
      opposition: Math.floor(Math.random()*1000),
      support: Math.floor(Math.random()*1000),
      objection: Math.floor(Math.random()*10),
      body: statements[Math.floor(Math.random()*statements.length)]
    };
    App.Statement.FIXTURES.push(statement);

    if ((level || 0) < 4) {
      for(var i=0; i<Math.random()*4; i++) {
        var response = makeStatement(debateId, (level || 0) + 1);
        response.parent = statement.id;
        statement.responses.push(response.id);
      }
    }

    return statement;
  }

  for(var i=0; i<App.Debate.FIXTURES.length; i++) {
    for(var j=0; j<Math.random()*5; j++) {
      var statement = makeStatement(App.Debate.FIXTURES[i].id);
      App.Debate.FIXTURES[i].statements.push(statement.id);
    }
  }

  console.log('Generated ' + App.Statement.FIXTURES.length + ' statements');
})();
