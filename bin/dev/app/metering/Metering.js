angular.module('boilerplate.metering', [
  'ui.router',
  'service.title'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('metering', {
      url: '/metering',
      views: {
        'main': {
          controller: 'MeteringController',
          templateUrl: 'metering/metering.html'
        }
      }
    });
  }
]);