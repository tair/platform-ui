angular
  .module('platform-ui.contentaccess.subscription.individual.bucket')
  .controller(
    /* Name */
    'BucketController',

	/* Dependencies */
	[
		'$http',
		'$scope',
		'$rootScope',
		'$stateParams',
		'BucketModel',

		/* Controller Definition */
		function ($http, $scope, $rootScope, $stateParams, BucketModel) {
			init()

			$scope.validate = function () {
				return (
				  $scope.selectedSubscriptionBucket.bucketTypeId != null &&
				  $scope.info.numOfSubscribers > 0 &&
				  $scope.userbool == true &&
				  $scope.termsbool == true
				)
			}

			$scope.validateAndSubmit = function () {
				$scope.errors = null
				if ($scope.selectedSubscriptionBucket.bucketTypeId == null) {
				  $scope.errors = 'Please select a subscription bucket.'
				  return false
				}
				if ($scope.info.numOfSubscribers <= 0) {
				  $scope.errors = 'Number of licenses must be a poitive integer.'
				  return false
				}
				if ($scope.userbool == false) {
				  $scope.errors =
					'Please confirm that you are an academic individual.'
				  return false
				}
				if ($scope.termsbool == false) {
				  $scope.errors = 'Please accept the terms of use.'
				  return false
				}
				return true
			  }

			function init() {
				var debugMsg = ''
				// $scope.subscriptions = BucketModel.subscriptions
				if ($scope.partnerId == null) {
					console.log('partnerId is null')
				}

				//rewrite the default values with correct actual values
				$http({
					url:
					  $scope.apiUri + '/partners/bucket_types/?partnerId=' + $scope.partnerId + '&orcid_id=' + $stateParams.orcid_id,
					method: 'GET',
				  })
					.success(function (data, status, headers, config) {
					  $scope.subscriptions = data
					  console.log(data);
					})
					.error(function (data, status, headers, config) {
					  debugMsg =
						'4.2. ERROR $scope.subscriptions is ' + $scope.subscriptions
					  console.log(debugMsg)
					  bootbox.alert(debugMsg)
					})
				
			}
		}
	]
  )