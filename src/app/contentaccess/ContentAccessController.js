/**
 * ContentAccess Controller
 */

angular.module('platform-ui.contentaccess').controller(
  /* Name */
  'ContentAccessController',

  /* Dependencies */
  [
    '$scope',
    'Title',
    'ContentAccessModel',

    /* Controller Definition */
    function ($scope, Title, ContentAccessModel) {
      Title.setTitle(ContentAccessModel.title)
    },
  ]
)
