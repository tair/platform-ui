/**
 * Partners Model
 */

angular.module('platform-ui.contentaccess.apidoc.partners').factory(
  /* Name */
  'PartnersModel',

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
            text: 'Partners API',
          },
        },
        templates: {
          doc: 'contentaccess/apidoc/partners/doc/doc.html',
        },
      }
    },
  ]
)
