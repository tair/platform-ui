/**
 * PhoenixSubscriptionController
 */

angular.module('platform-ui.adminportal.role.phoenix.subscription').controller(
  /* Name */
  'PhoenixSubscriptionController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'PhoenixSubscriptionModel',

    /* Controller Definition */
    function (
      $scope,
      $http,
      $cookies,
      $window,
      $location,
      $state,
      Title,
      PhoenixProfileModel
    ) {
      init()

      $scope.downloadRequest = function () {
        $window.location.href =
          $scope.apiUri +
          '/subscriptions/subscriptionrequest/?credentialId=' +
          $scope.credentialId +
          '&secretKey=' +
          encodeURIComponent($scope.secretKey)
      }
      $scope.downloadLink =
        $scope.apiUri +
        '/subscriptions/subscriptionrequest/?credentialId=' +
        $scope.credentialId +
        '&secretKey=' +
        encodeURIComponent($scope.secretKey)
      function init() {
        $scope.setCurrentTab(PhoenixProfileModel.currentTab)
        //				if(!$scope.credentialId || !$scope.secretKey){
        //					$state.go('ltlogin');
        //				}
      }
    },
  ]
)
