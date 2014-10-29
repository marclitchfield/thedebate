angular.module('thedebate.controllers.objections', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('objections', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: function($scope, $stateParams) {
          $scope.statement = {
            id: $stateParams.id,
            debate: {
              id: 1,
              score: 888,
              title: 'debate 1'
            },
            body: 'context statement ' + $stateParams.id,
            score: 785,
            support: 1,
            opposition: 2,
            objection: 3,
            objections: [
              {id:1,score:994,body:'objection 1'},
              {id:2,score:824,body:'objection 2'},
              {id:3,score:122,body:'objection 3'},
              {id:4,score:80, body:'objection 4'},
              {id:5,score:71, body:'objection 5'}
            ]
          };
        }
      })
      .state('objections.index', {
        url: '/objections',
        templateUrl: 'templates/controllers/objections/index.tpl.html'
      })
      .state('objections.new', {
        url: '/objections/new',
        templateUrl: 'templates/controllers/objections/new.tpl.html'
      });
  });