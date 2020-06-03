/**
 * Credentials Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.apidoc.credentials',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.apidoc.credentials.doc',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider.state('apidoc.credentials.doc', {
      url: '',
      views: {
        credentials: {
          controller: 'CredentialsDocController',
          templateUrl: 'contentaccess/apidoc/credentials/doc/doc.html',
        },
      },
    })
  })
