/**
 * Parties Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.apidoc.parties',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.apidoc.parties.doc',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider.state('apidoc.parties.doc', {
      url: '',
      views: {
        parties: {
          controller: 'PartiesDocController',
          templateUrl: 'contentaccess/apidoc/parties/doc/doc.html',
        },
      },
    })
  })
