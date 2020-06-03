/**
 * Authorizations Controller
 */

angular.module('platform-ui.contentaccess.apidoc.authorizations').controller(
  /* Name */
  'AuthorizationsController',

  /* Dependencies */
  [
    '$scope',
    '$state',
    'AuthorizationsModel',

    /* Controller Definition */
    function ($scope, $state, AuthorizationsModel) {
      init()
      function init() {
        $scope.currentTab = AuthorizationsModel.currentTab
        $scope.tabs = AuthorizationsModel.tabs
        $scope.templates = AuthorizationsModel.templates
      }
    },
  ]
)
