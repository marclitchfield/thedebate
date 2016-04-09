// TODO: Figure out how to separate controllers into their own modules. 
// Need to be able to inject into .config method.

angular.module('thedebate.routes.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.controllers.responses.default',
  'thedebate.controllers.responses.new',
  'thedebate.controllers.responses.objections.edit',
  'thedebate.controllers.responses.objections.logic',
  'thedebate.controllers.responses.objections.junk'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('responses', {
        url: '/statement/:id/:type',
        templateUrl: 'templates/routes/responses/default.tpl.html',
        resolve: {
          statement: function($http, $stateParams) {
            return $http.get('/api/statement/' + $stateParams.id);
          }
        },
        controller: 'ResponsesDefaultController'
      })
      .state('responses.index', {
        templateUrl: 'templates/routes/responses/index.tpl.html'
      })
      .state('responses.new', {
        url: '^/statement/:id/:type/respond',
        templateUrl: 'templates/routes/responses/new.tpl.html',
        controller: 'ResponsesNewController'
      });
  });
