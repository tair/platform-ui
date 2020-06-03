/**
 * Authorizations Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.apidoc.authorizations',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.apidoc.authorizations.doc',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider.state('apidoc.authorizations.doc', {
      url: '',
      views: {
        authorizations: {
          controller: 'AuthorizationsDocController',
          templateUrl: 'contentaccess/apidoc/authorizations/doc/doc.html',
        },
      },
    })
  })
