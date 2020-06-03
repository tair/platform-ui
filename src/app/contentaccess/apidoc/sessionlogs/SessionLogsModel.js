/**
 * SessionLogs Model
 */

angular.module('platform-ui.contentaccess.apidoc.sessionlogs').factory(
  /* Name */
  'SessionLogsModel',

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
            text: 'SessionLogs API',
          },
        },
        templates: {
          doc: 'contentaccess/apidoc/sessionlogs/doc/doc.html',
        },
      }
    },
  ]
)
