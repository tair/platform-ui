/**
 * Subscriptions Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.apidoc.subscriptions',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.apidoc.subscriptions.doc',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider.state('apidoc.subscriptions.doc', {
      url: '',
      views: {
        subscriptions: {
          controller: 'SubscriptionsDocController',
          templateUrl: 'contentaccess/apidoc/subscriptions/doc/doc.html',
        },
      },
    })
  })
