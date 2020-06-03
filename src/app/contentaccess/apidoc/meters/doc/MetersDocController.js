/**
 * Meters Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.meters.doc').controller(
  /* Name */
  'MetersDocController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$stateParams',
    'MetersDocModel',

    /* Controller Definition */
    function ($http, $scope, $stateParams, MetersDocModel) {
      init()

      function init() {
        $scope.heading = MetersDocModel.heading
        $scope.overview = MetersDocModel.overview
        $scope.datatypes = MetersDocModel.datatypes
        $scope.calls = MetersDocModel.calls
      }
    },
  ]
)
