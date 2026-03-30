angular
  .module('platform-ui.contentaccess.subscription.individual.bucket')
  .controller(
    /* Name */
    'BucketController',

	/* Dependencies */
	[
		'$http',
		'$scope',
		'$cookies',
		'$rootScope',
		'$state',
		'$stateParams',
		'BucketModel',

		/* Controller Definition */
		function ($http, $scope, $cookies, $rootScope, $state, $stateParams, BucketModel) {
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
				var partnerId = $stateParams.partnerId;
				var isTair = partnerId && partnerId.toLowerCase() === 'tair';

				// Require login for TAIR partner
				if (isTair && !$cookies.credentialId && !$stateParams.orcid_id) {
					var returnUrl = '/contentaccess/subscription/individual?partnerId=' + partnerId;
					if ($stateParams.redirect) {
						returnUrl += '&redirect=' + encodeURIComponent($stateParams.redirect);
					}
					$state.go('login.form', {
						partnerId: partnerId,
						redirect: $stateParams.redirect,
						returnTo: returnUrl,
					});
					return;
				}

				if ($stateParams.orcid_id == null) {
					if ($cookies.credentialId != null) {
						$scope.credentialId = $cookies.credentialId
					}
				}

				//rewrite the default values with correct actual values
				$http({
					url:
					  $scope.apiUri + '/partners/bucket_types/?partnerId=' + $scope.partnerId + '&orcid_id=' + $stateParams.orcid_id + '&credentialId=' + $scope.credentialId,
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
					//   bootbox.alert(debugMsg)
					})
				
			}
		}
	]
  )