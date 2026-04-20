/**
 * SubscriptionEdit Controller
 */

angular
  .module('platform-ui.adminportal.role.consortium.subscription.edit')
  .controller(
    /* Name */
    'ConsortiumSubscriptionEditController',

    /* Dependencies */
    [
      '$scope',
      '$http',
      '$cookies',
      '$window',
      '$location',
      '$state',
      'ConsortiumSubscriptionEditModel',

      /* Controller Definition */
      function (
        $scope,
        $http,
        $cookies,
        $window,
        $location,
        $state,
        ConsortiumSubscriptionEditModel
      ) {
        init()

        $scope.back = function () {
          $state.go('role.consortium.subscription.list')
        }

        $scope.requestEdit = function () {
          if ($scope.transactionType == 'renew') {
            var endDate = new Date($scope.postData.endDate + ' 11:59:59.9');
            endDate.setDate(endDate.getDate() + 1);
            var endDateStr = endDate.toISOString();
            postData = {
              subscriptionId:
                $scope.allSubscriptions[$scope.partnerId].subscriptionId,
              partyId: $scope.consortiumId,
              partnerId: $scope.partnerId,
              startDate: $scope.postData.startDate + ' 00:00:00.0',
              endDate: endDateStr,
            }
            $http({
              url:
                $scope.apiUri +
                '/subscriptions/' +
                $scope.allSubscriptions[$scope.partnerId].subscriptionId +
                '/renewal/' +
                '?credentialId=' +
                $scope.credentialId +
                '&secretKey=' +
                encodeURIComponent($scope.secretKey),
              method: 'PUT',
              data: postData,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
              .success(function (data, status, headers, config) {
                $scope.allSubscriptions[$scope.partnerId].startDate =
                  data['startDate']
                $scope.allSubscriptions[$scope.partnerId].endDate =
                  data['endDate']
                $scope.successMessage = 'Subscription renewed successfully!'
              })
              .error(function () {
                alert('Failed to renew subscription!')
              })
          } else if ($scope.transactionType == 'create') {
            var endDate = new Date($scope.postData.endDate + ' 11:59:59.9');
            endDate.setDate(endDate.getDate() + 1);
            var endDateStr = endDate.toISOString();
            postData = {
              partyId: $scope.consortiumId,
              partnerId: $scope.partnerId,
              startDate: $scope.postData.startDate + ' 00:00:00.0',
              endDate: endDateStr,
            }
            $http({
              url:
                $scope.apiUri +
                '/subscriptions/' +
                '?credentialId=' +
                $scope.credentialId +
                '&secretKey=' +
                encodeURIComponent($scope.secretKey),
              method: 'POST',
              data: postData,
            })
              .success(function (data, status, headers, config) {
                delete data['subscriptionTransactionId']
                $scope.allSubscriptions[$scope.partnerId] = data
                $scope.successMessage = 'Subscription created successfully!'
              })
              .error(function () {
                alert('Failed to create subscription!')
              })
          }
          //		return true;
        }

        function init() {
          $scope.uiparams = ConsortiumSubscriptionEditModel.uiparams
          $scope.partnerId = $location.search()['partnerId']
          //		if(!$scope.credentialId || !$scope.secretKey){
          //			$state.go('ltlogin');
          //		}
          if ($scope.partnerId in $scope.allSubscriptions) {
            $scope.transactionType = 'renew'
            $scope.startDate = $scope.allSubscriptions[
              $scope.partnerId
            ].startDate.split('T')[0]
            $scope.endDate = $scope.allSubscriptions[
              $scope.partnerId
            ].endDate.split('T')[0]
          } else {
            $scope.transactionType = 'create'
          }
          $(function () {
            $('#startDate').datepicker({
              dateFormat: 'yy-mm-dd',
            })
          })
          $(function () {
            $('#endDate').datepicker({
              dateFormat: 'yy-mm-dd',
            })
          })
        }
      },
    ]
  )
