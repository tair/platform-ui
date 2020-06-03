/**
 * Parties Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.parties.doc').controller(
  /* Name */
  'PartiesDocController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$stateParams',
    'PartiesDocModel',

    /* Controller Definition */
    function ($http, $scope, $stateParams, PartiesDocModel) {
      init()

      function init() {
        $scope.heading = PartiesDocModel.heading
        $scope.overview = PartiesDocModel.overview
        $scope.datatypes = PartiesDocModel.datatypes
        $scope.calls = PartiesDocModel.calls
      }
    },
  ]
)
