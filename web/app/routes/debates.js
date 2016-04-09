angular.module('thedebate.routes.debates', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.controllers.debates.index',
  'thedebate.controllers.debates.new'  
])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/debates');

    $stateProvider
      .state('debates', { 
        templateUrl: 'templates/routes/debates/default.tpl.html'
      })
      .state('debates.index', {
        url: '/debates',
        templateUrl: 'templates/routes/debates/index.tpl.html',
        resolve: {
          debates: function($http) {
            return $http.get('/api/debates');
          }
        },
        controller: 'DebatesIndexController'
      })
      .state('debates.new', {
        url: '/debates/new',
        templateUrl: 'templates/routes/debates/new.tpl.html',
        controller: 'DebatesNewController'
      });
  });