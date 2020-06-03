/**
 * Partners Controller
 */

angular.module('platform-ui.contentaccess.apidoc.partners').controller(
  /* Name */
  'PartnersController',

  /* Dependencies */
  [
    '$scope',
    '$state',
    'PartnersModel',

    /* Controller Definition */
    function ($scope, $state, PartnersModel) {
      init()
      function init() {
        $scope.currentTab = PartnersModel.currentTab
        $scope.tabs = PartnersModel.tabs
        $scope.templates = PartnersModel.templates
      }
    },
  ]
)
