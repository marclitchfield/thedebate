(function() {
  var debates = {}, statements = {}, parents = {};
  var id = 0;

  angular.module('thedebate.fixtures', [])
    .factory('fixtures', function() {
      return {
        debates: debates,
        statements: statements
      };
    })
    .run(function() {
      // create debates and statements
      _.range(10).map(createDebate);
    });


  function createDebate() {
    var debate = {
      id: ++id,
      score: id,
      title: 'debate ' + id
    };

    debate.statements = _.range(3).map(function() { return createStatement('statement', debate); });
    debates[debate.id.toString()] = debate;
  }

  function createStatement(type, debate, parent, level) {
    var thisLevel = level || 0;
    var statement = {
      id: ++id,
      score: id,
      support: id,
      opposition: id,
      objection: id,
      debate: debate
    };

    if (parent !== undefined) {
      parents[statement.id] = parent;
    }
    statement.chain = buildChain(statement.id);
    statement.body = type + ' ' + statement.id +  
      ' [' + statement.chain.map(function(p) { return p.id; }).reverse().join('.') + ']' + 
      ' at level ' + (thisLevel+1) +
      ' in debate ' + debate.id;
      

    if (thisLevel < 3) {
      statement.responses = _.range(3).map(function() { return createStatement('response', debate, statement, thisLevel + 1); });
      statement.objections = _.range(2).map(function() { return createStatement('objection', debate, statement, thisLevel + 1); });
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