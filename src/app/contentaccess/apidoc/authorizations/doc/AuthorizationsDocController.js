/**
 * Authorizations Doc Controller
 */

angular
  .module('platform-ui.contentaccess.apidoc.authorizations.doc')
  .controller(
    /* Name */
    'AuthorizationsDocController',

    /* Dependencies */
    [
      '$http',
      '$scope',
      '$stateParams',
      'AuthorizationsDocModel',

      /* Controller Definition */
      function ($http, $scope, $stateParams, AuthorizationsDocModel) {
        init()

        function init() {
          $scope.heading = AuthorizationsDocModel.heading
          $scope.overview = AuthorizationsDocModel.overview
          $scope.datatypes = AuthorizationsDocModel.datatypes
          $scope.calls = AuthorizationsDocModel.calls
        }
      },
    ]
  )
