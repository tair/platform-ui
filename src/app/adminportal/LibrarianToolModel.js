/**
 * adminportal Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal').factory(
  /* Name */
  'adminportalModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'adminportal',
      }
    },
  ]
)
