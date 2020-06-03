/**
 * Authorizations Model
 */

angular.module('platform-ui.contentaccess.apidoc.authorizations').factory(
  /* Name */
  'AuthorizationsModel',

  /* Dependencies */
  [
    function () {
      return {
        currentTab: 'doc',
        tabs: {
          notused: {
            id: 'not used',
            text: 'Not Used',
          },
          tab1: {
            id: 'doc',
            text: 'Authorizations API',
          },
        },
        templates: {
          doc: 'contentaccess/apidoc/authorizations/doc/doc.html',
        },
      }
    },
  ]
)
