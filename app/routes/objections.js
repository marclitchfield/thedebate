angular.module('thedebate.routes.objections', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('objections', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.statement = fixtures.statements.all[$stateParams.id];
        }
      })
      .state('objections.index', {
        url: '/objections',
        templateUrl: 'templates/routes/objections/index.tpl.html'
      })
      .state('objections.new', {
        url: '/objections/new',
        templateUrl: 'templates/routes/objections/new.tpl.html',
        controller: function($scope, $state, fixtures) {
          $scope.body = '';
          $scope.submit = function() {
            $scope.statement.objections.push(fixtures.statements.create({ 
              body: $scope.body, 
              debate: $scope.statement.debate,
              parent: $scope.statement,
              score: 0, 
              support: 0, 
              opposition: 0, 
              objection: 0 
            }));
            $state.go('objections.index', { id: $scope.statement.id });
          };
        }
      });
  });