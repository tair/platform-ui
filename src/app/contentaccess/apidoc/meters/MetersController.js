/**
 * Meters Controller
 */

angular.module('platform-ui.contentaccess.apidoc.meters').controller(
  /* Name */
  'MetersController',

  /* Dependencies */
  [
    '$scope',
    '$state',
    'MetersModel',

    /* Controller Definition */
    function ($scope, $state, MetersModel) {
      init()
      function init() {
        $scope.currentTab = MetersModel.currentTab
        $scope.tabs = MetersModel.tabs
        $scope.templates = MetersModel.templates
      }
    },
  ]
)
