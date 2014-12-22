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
        controller: function($scope, $state, $stateParams, fixtures) {
          $scope.$state = $state;
          $scope.statement = fixtures.statements.all[$stateParams.id];

          $scope.toggle = function(type) {
            return ($scope.responseType && $scope.responseType === type) ? '' : type;
          };
        }
      })
      .state('responses.index', {
        url: '/:type',
        templateUrl: 'templates/routes/responses/index.tpl.html',
        controller: function($scope, $state, $stateParams) {
          $scope.$parent.responseType = $stateParams.type;

          if (!$stateParams.type) {
            $scope.responses = $scope.statement.responses;
          } else {
            $scope.responses = $scope.statement.responses.filter(function(response) {
              return response.type === $stateParams.type;
            });
          }
        }
      })
      .state('responses.new', {
        url: '/respond/:type',
        templateUrl: 'templates/routes/responses/new.tpl.html',
        controller: function($scope, $state, $stateParams, fixtures) {
          $scope.body = '';
          $scope.responseType = $stateParams.type;

          $scope.cancel = function() {
            window.history.back();
          };

          $scope.submit = function() {
            $scope.statement.responses.push(fixtures.statements.create({ 
              body: $scope.body, 
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
        }
      });
  });