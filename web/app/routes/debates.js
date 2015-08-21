angular.module('thedebate.routes.debates', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.fixtures'
])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/debates');

    $stateProvider
      .state('debates', {
        templateUrl: 'templates/pages/debates.tpl.html',
        controller: function($scope, fixtures) {
          $scope.debates = _.values(fixtures.debates.all);
        }
      })
      .state('debates.index', {
        url: '/debates',
        templateUrl: 'templates/routes/debates/index.tpl.html'
      })
      .state('debates.new', {
        url: '/debates/new',
        templateUrl: 'templates/routes/debates/new.tpl.html',
        controller: function($scope, $state, fixtures) {
          $scope.title = '';

          $scope.cancel = function() {
            window.history.back();
          };
                    
          $scope.submit = function() {
            $scope.debates.push(fixtures.debates.create({ title: $scope.title, score: 0 }));
            $state.go('debates.index');
          };
        }
      });
  });