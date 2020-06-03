/**
 * API Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc').controller(
  /* Name */
  'ApiDocController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$location',
    '$state',
    'Title',
    'ApiDocModel',

    /* Controller Definition */
    function ($http, $scope, $location, $state, Title, ApiDocModel) {
      init()
      console.log($state)

      $scope.switchTab = function (tabName) {
        // $scope.currentTab = tabName;
        if (tabName == 'landing') {
          $state.go('apidoc.landing', {})
          console.log($state)
          return
        }
      }

      function init() {
        Title.setTitle(ApiDocModel.title) // PW-264
        $scope.initialheading = ApiDocModel.initialheading
        $scope.currentTab = ApiDocModel.currentTab
        $scope.tabs = ApiDocModel.tabs
        $scope.templates = ApiDocModel.templates
      }
    },
  ]
)
