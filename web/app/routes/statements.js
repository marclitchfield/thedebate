angular.module('thedebate.routes.statements', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.controllers.statements.default',
  'thedebate.controllers.statements.new'
])
  .config(function($stateProvider) {
    
    $stateProvider
      .state('statements', {
        url: '/debate/:id',
        templateUrl: 'templates/routes/statements/default.tpl.html',
        resolve: {
          debate: function($http, $stateParams) {
            return $http.get('/api/debate/' + $stateParams.id);
          }
        },
        controller: 'StatementsDefaultController'
      })
      .state('statements.index', {
        templateUrl: 'templates/routes/statements/index.tpl.html'
      })
      .state('statements.new', {
        url: '/statements/new',
        templateUrl: 'templates/routes/statements/new.tpl.html',
        controller: 'StatementsNewController'
      });
  });