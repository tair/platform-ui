/**
 * Subscriptions Model
 */

angular.module('platform-ui.contentaccess.apidoc.subscriptions').factory(
  /* Name */
  'ApiDocSubscriptionsModel',

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
            text: 'Subscriptions API',
          },
        },
        templates: {
          doc: 'contentaccess/apidoc/subscriptions/doc/doc.html',
        },
      }
    },
  ]
)
