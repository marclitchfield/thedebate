angular.module('thedebate.routes.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('responses', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.statement = fixtures.statements.all[$stateParams.id];
        }
      })
      .state('responses.index', {
        url: '/responses',
        templateUrl: 'templates/routes/responses/index.tpl.html'
      })
      .state('responses.new', {
        url: '/responses/new',
        templateUrl: 'templates/routes/responses/new.tpl.html',
        controller: function($scope, $state, fixtures) {
          $scope.body = '';
          $scope.submit = function() {
            $scope.statement.responses.push(fixtures.statements.create({ 
              body: $scope.body, 
              debate: $scope.statement.debate,
              parent: $scope.statement,
              score: 0, 
              support: 0, 
              opposition: 0, 
              objection: 0 
            }));
            $state.go('responses.index', { id: $scope.statement.id });
          };
        }
      });
  });