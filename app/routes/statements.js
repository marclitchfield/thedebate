angular.module('thedebate.routes.statements', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('statements', {
        url: '/debate/:id',
        templateUrl: 'templates/pages/statements.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.debate = fixtures.debates.all[$stateParams.id];
        }
      })
      .state('statements.index', {
        url: '/statements',
        templateUrl: 'templates/routes/statements/index.tpl.html'
      })
      .state('statements.new', {
        url: '/statements/new',
        templateUrl: 'templates/routes/statements/new.tpl.html',
        controller: function($scope, $state, fixtures) {
          $scope.body = '';
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
        }
      });
  });