/**
 * Meters Model
 */

angular.module('platform-ui.contentaccess.apidoc.meters').factory(
  /* Name */
  'MetersModel',

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
            text: 'Meters API',
          },
        },
        templates: {
          doc: 'contentaccess/apidoc/meters/doc/doc.html',
        },
      }
    },
  ]
)
