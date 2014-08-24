import Statement from '../models/statement';
import Debate from '../models/debate';

export default {
  create: function() {
    var fixtures = [];

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
        id: fixtures.length + 1,
        debate: debateId,
        responses: [],
        score: Math.floor(Math.random()*1000), 
        opposition: Math.floor(Math.random()*1000),
        support: Math.floor(Math.random()*1000),
        objection: Math.floor(Math.random()*10),
        body: statements[Math.floor(Math.random()*statements.length)]
      };

      fixtures.push(statement);

      if ((level || 0) < 4) {
        for(var i=0; i<Math.random()*4; i++) {
          var response = makeStatement(debateId, (level || 0) + 1);
          response.parent = statement.id;
          statement.responses.push(response.id);
        }
      }

      return statement;
    }

    for(var i=0; i<Debate.FIXTURES.length; i++) {
      for(var j=0; j<Math.random()*5; j++) {
        var statement = makeStatement(Debate.FIXTURES[i].id);
        Debate.FIXTURES[i].statements.push(statement.id);
      }
    }

    Statement.reopenClass({
      FIXTURES: fixtures
    });    
  }
};