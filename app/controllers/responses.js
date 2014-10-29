angular.module('thedebate.controllers.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.directives.statement-chain'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('responses', {
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
            subject: {
              id: $stateParams.id + ".1",
              score: 887,
              title: 'subject ' + $stateParams.id + ".1",
              subject: {
                id: $stateParams.id + ".1.1",
                score: 886,
                title: 'subject ' + $stateParams.id + ".1.1",
              }
            },
            body: 'context statement ' + $stateParams.id,
            score: 785,
            support: 1,
            opposition: 2,
            objection: 3,
            responses: [
              {id:1,score:994,body:'response 1'},
              {id:2,score:824,body:'response 2'},
              {id:3,score:122,body:'response 3'},
              {id:4,score:80, body:'response 4'},
              {id:5,score:71, body:'response 5'}
            ]
          };
        }
      })
      .state('responses.index', {
        url: '/responses',
        templateUrl: 'templates/controllers/responses/index.tpl.html'
      })
      .state('responses.new', {
        url: '/responses/new',
        templateUrl: 'templates/controllers/responses/new.tpl.html'
      });
  });