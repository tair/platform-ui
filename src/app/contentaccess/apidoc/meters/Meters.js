/**
 * Meters Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.apidoc.meters',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.apidoc.meters.doc',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider.state('apidoc.meters.doc', {
      url: '',
      views: {
        meters: {
          controller: 'MetersDocController',
          templateUrl: 'contentaccess/apidoc/meters/doc/doc.html',
        },
      },
    })
  })
