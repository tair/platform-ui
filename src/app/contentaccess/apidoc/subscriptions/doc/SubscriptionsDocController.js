/**
 * Subscriptions Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.subscriptions.doc').controller(
  /* Name */
  'SubscriptionsDocController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$stateParams',
    'SubscriptionsDocModel',

    /* Controller Definition */
    function ($http, $scope, $stateParams, SubscriptionsDocModel) {
      init()

      function init() {
        $scope.heading = SubscriptionsDocModel.heading
        $scope.overview = SubscriptionsDocModel.overview
        $scope.datatypes = SubscriptionsDocModel.datatypes
        $scope.calls = SubscriptionsDocModel.calls
      }
    },
  ]
)
