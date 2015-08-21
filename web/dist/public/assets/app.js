angular.module('thedebate', [
  'thedebate.routes.debates',
  'thedebate.routes.statements',
  'thedebate.routes.responses',
  'thedebate.templates',
  'ui.router'
])
  .config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);

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
      score: data.score === undefined ? id : data.score,
      title: data.title || ('debate ' + id)
    };

    debate.statements = data.title ? [] : _.range(3).map(function() { return createStatement({ debate: debate, level: 0 }); });
    debates[debate.id.toString()] = debate;
    return debate;
  }

  function createStatement(data) {
    var statement = {
      id: ++id,
      score: data.score === undefined ? id : data.score,
      scores: {
        support: data.support === undefined ? Math.random() * 10000 : data.support,
        opposition: data.opposition === undefined ? Math.random() * 10000 : data.opposition,
        objection: data.objection === undefined ? Math.random() * 10000 : data.objection,
      },
      debate: data.debate,
      type: data.type,
      responses: []
    };

    if (data.parent !== undefined) {
      parents[statement.id] = data.parent;
    }

    statement.chain = buildChain(statement.id);
    statement.body = data.body || ((data.type || 'statement') + ' ' + statement.id +  
      ' [' + statement.chain.map(function(p) { return p.id; }).reverse().join('.') + ']' + 
      ' at level ' + ((data.level || 0)+1) +
      ' in debate ' + data.debate.id);

    if (data.level !== undefined && data.level < 3) {
      ['support','opposition','objection'].forEach(function(type) {
        _.range(3).forEach(function() {
          statement.responses.push(createStatement({ 
            type: type, 
            debate: data.debate, 
            parent: statement, 
            level: data.level + 1 
          }));
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
angular.module('thedebate.directives.debate', [])
  .directive('debate', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/debate.tpl.html',
      scope: {
        debate: '=model'
      }
    };
  });
angular.module('thedebate.directives.score-indicator', [])
  .directive('scoreIndicator', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/score-indicator.tpl.html',
      scope: {
        scores: '='
      },
      controller: ["$scope", function($scope) {
        var total = $scope.scores.support + $scope.scores.opposition + $scope.scores.objection;
        $scope.supportPercentage = total ? (100 * $scope.scores.support / total) : 0;
        $scope.oppositionPercentage = total ? (100 * $scope.scores.opposition / total) : 0;
        $scope.objectionPercentage = total ? (100 * $scope.scores.objection / total) : 0;
      }]
    };
  });
angular.module('thedebate.directives.statement', [
  'thedebate.directives.score-indicator'
])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html',
      scope: {
        statement: '=model'
      },
      controller: ["$scope", function($scope) {
        $scope.upvote = function($event) {
          $scope.statement.upvoted = !$scope.statement.upvoted;
          if ($event.stopPropagation) { $event.stopPropagation(); }
          if ($event.preventDefault) { $event.preventDefault(); }
        };
      }]
    };
  });
angular.module('thedebate.routes.debates', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.fixtures'
])
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/debates');

    $stateProvider
      .state('debates', {
        templateUrl: 'templates/pages/debates.tpl.html',
        controller: ["$scope", "fixtures", function($scope, fixtures) {
          $scope.debates = _.values(fixtures.debates.all);
        }]
      })
      .state('debates.index', {
        url: '/debates',
        templateUrl: 'templates/routes/debates/index.tpl.html'
      })
      .state('debates.new', {
        url: '/debates/new',
        templateUrl: 'templates/routes/debates/new.tpl.html',
        controller: ["$scope", "$state", "fixtures", function($scope, $state, fixtures) {
          $scope.title = '';

          $scope.cancel = function() {
            window.history.back();
          };
                    
          $scope.submit = function() {
            $scope.debates.push(fixtures.debates.create({ title: $scope.title, score: 0 }));
            $state.go('debates.index');
          };
        }]
      });
  }]);
angular.module('thedebate.routes.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('responses', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: ["$scope", "$state", "$stateParams", "fixtures", function($scope, $state, $stateParams, fixtures) {
          $scope.$state = $state;
          $scope.statement = fixtures.statements.all[$stateParams.id];

          $scope.toggle = function(type) {
            return ($scope.responseType && $scope.responseType === type) ? '' : type;
          };
        }]
      })
      .state('responses.index', {
        url: '/:type',
        templateUrl: 'templates/routes/responses/index.tpl.html',
        controller: ["$scope", "$state", "$stateParams", function($scope, $state, $stateParams) {
          $scope.$parent.responseType = $stateParams.type;

          if (!$stateParams.type) {
            $scope.responses = $scope.statement.responses;
          } else {
            $scope.responses = $scope.statement.responses.filter(function(response) {
              return response.type === $stateParams.type;
            });
          }
        }]
      })
      .state('responses.new', {
        url: '/respond/:type',
        templateUrl: 'templates/routes/responses/new.tpl.html',
        controller: ["$scope", "$state", "$stateParams", "fixtures", function($scope, $state, $stateParams, fixtures) {
          $scope.responseBody = '';
          $scope.responseType = $stateParams.type;

          $scope.cancel = function() {
            window.history.back();
          };

          $scope.submit = function() {
            $scope.statement.responses.push(fixtures.statements.create({ 
              body: $scope.responseBody, 
              debate: $scope.statement.debate,
              parent: $scope.statement,
              type: $scope.responseType,
              score: 0, 
              support: 0, 
              opposition: 0, 
              objection: 0
            }));

            $state.go('responses.index', { id: $scope.statement.id, type: $scope.responseType });
          };
        }]
      });
  }]);
angular.module('thedebate.routes.statements', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(["$stateProvider", function($stateProvider) {
    $stateProvider
      .state('statements', {
        url: '/debate/:id',
        templateUrl: 'templates/pages/statements.tpl.html',
        controller: ["$scope", "$state", "$stateParams", "fixtures", function($scope, $state, $stateParams, fixtures) {
          $scope.$state = $state;
          $scope.debate = fixtures.debates.all[$stateParams.id];
        }]
      })
      .state('statements.index', {
        url: '/statements',
        templateUrl: 'templates/routes/statements/index.tpl.html'
      })
      .state('statements.new', {
        url: '/statements/new',
        templateUrl: 'templates/routes/statements/new.tpl.html',
        controller: ["$scope", "$state", "fixtures", function($scope, $state, fixtures) {
          $scope.body = '';

          $scope.cancel = function() {
            window.history.back();
          };

          $scope.submit = function() {
            $scope.debate.statements.push(fixtures.statements.create({ 
              body: $scope.body, 
              debate: $scope.debate, 
              score: 0, 
              support: 0, 
              opposition: 0, 
              objection: 0
            }));
            $state.go('statements.index', { id: $scope.debate.id });
          };
        }]
      });
  }]);