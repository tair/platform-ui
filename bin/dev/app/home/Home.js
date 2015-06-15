angular.module('boilerplate.home', [
  'ui.router',
  'service.title'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        'main': {
          controller: 'HomeController',
          templateUrl: 'home/home.html'
        }
      }
    });
  }
]);