(function() {
  var debates = {}, statements = {}, parents = {};
  var id = 0;

  angular.module('thedebate.fixtures', [])
    .factory('fixtures', function() {
      return {
        debates: {
          all: debates,
          create: createDebate,
        },
        statements: {
          all: statements,
          create: createStatement
        }
      };
    })
    .run(function() {
      // create debates and statements
      _.range(10).map(createDebate);
    });

  function createDebate(data) {
    var debate = {
      id: ++id,
      score: data.score || id,
      title: data.title || ('debate ' + id)
    };

    debate.statements = data.title ? [] : _.range(3).map(function() { return createStatement({ debate: debate, level: 0 }); });
    debates[debate.id.toString()] = debate;
    return debate;
  }

  function createStatement(data) {
    var statement = {
      id: ++id,
      score: id,
      support: data.support || Math.random() * 10000,
      opposition: data.opposition || Math.random() * 10000,
      objection: data.objection || Math.random() * 10000,
      debate: data.debate
    };

    if (data.parent !== undefined) {
      parents[statement.id] = data.parent;
    }
    statement.chain = buildChain(statement.id);
    statement.body = data.body || ((data.type || 'statement') + ' ' + statement.id +  
      ' [' + statement.chain.map(function(p) { return p.id; }).reverse().join('.') + ']' + 
      ' at level ' + ((data.level || 0)+1) +
      ' in debate ' + data.debate.id);
      

    if (data.level && data.level < 3) {
      statement.responses = _.range(3).map(function() { 
        return createStatement({ 
          type: 'response', 
          debate: data.debate, 
          parent: statement, 
          level: data.level + 1 
        });
      });
      statement.objections = _.range(2).map(function() { 
        return createStatement({ 
          type: 'objection', 
          debate: data.debate, 
          parent: statement, 
          level: data.level + 1
        });
      });
    }

    statements[statement.id.toString()] = statement;
    return statement;
  }

  function buildChain(statementId) {
    var parent = parents[statementId];
    if (parent === undefined) {
      return [];
    }
    return buildChain(parent.id).concat(parent);
  }

})();