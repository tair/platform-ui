/**
 * Credentials Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.credentials.doc').controller(
  /* Name */
  'CredentialsDocController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$stateParams',
    'CredentialsDocModel',

    /* Controller Definition */
    function ($http, $scope, $stateParams, CredentialsDocModel) {
      init()

      function init() {
        $scope.heading = CredentialsDocModel.heading
        $scope.overview = CredentialsDocModel.overview
        $scope.datatypes = CredentialsDocModel.datatypes
        $scope.calls = CredentialsDocModel.calls
      }
    },
  ]
)
