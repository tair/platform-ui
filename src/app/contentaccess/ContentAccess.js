/**
 * ContentAccess Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.subscription',
      'platform-ui.contentaccess.apidoc',
      'platform-ui.contentaccess.login',
      'platform-ui.contentaccess.metering',
      'platform-ui.contentaccess.activation',
      'platform-ui.contentaccess.list',
      'platform-ui.contentaccess.guide',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('subscription', {
        abstract: true,
        url: '/contentaccess/subscription',
        views: {
          main: {
            controller: 'SubscriptionController',
            templateUrl: 'contentaccess/subscription/subscription.html',
          },
        },
      })
      .state('apidoc', {
        abstract: true,
        url: '/contentaccess/apidoc',
        views: {
          main: {
            controller: 'ApiDocController',
            templateUrl: 'contentaccess/apidoc/api.html',
          },
        },
      })
      .state('metering', {
        url: '/contentaccess/metering',
        views: {
          main: {
            controller: 'MeteringController',
            templateUrl: 'contentaccess/metering/metering.html',
          },
        },
      })
      .state('login', {
        abstract: true,
        url: '/contentaccess/login',
        views: {
          main: {
            controller: 'LoginController',
            templateUrl: 'contentaccess/login/login.html',
          },
        },
      })
      .state('activation', {
        abstract: true,
        url: '/contentaccess/activation',
        views: {
          main: {
            controller: 'ActivationController',
            templateUrl: 'contentaccess/activation/activation.html',
          },
        },
      })
      .state('list', {
        url: '/contentaccess/list',
        views: {
          main: {
            controller: 'ListController',
            templateUrl: 'contentaccess/list/list.html',
          },
        },
      })
      .state('guide', {
        url: '/contentaccess/guide',
        views: {
          main: {
            controller: 'GuideController',
            templateUrl: 'contentaccess/guide/guide.html',
          },
        },
      })
  })
