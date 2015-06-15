angular.module('boilerplate.subscription', [
  'ui.router',
  'service.title',
  'boilerplate.subscription.info.institution'
]).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('subscription', {
      url: '/subscription',
      views: {
        'main': {
          controller: 'SubscriptionController',
          templateUrl: 'subscription/subscription.html'
        }
      }
    });
  }
]);