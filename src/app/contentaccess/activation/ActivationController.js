/**
 * Activation Controller
 */

angular.module('platform-ui.contentaccess.activation').controller(
	/* Name */
	'ActivationController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$location',
	'$cookies',
	'$state',
	'Title',
	'ActivationModel',

	/* Controller Definition */
	function ($scope, $http, $location, $cookies, $state, Title, ActivationModel) {
		init();

		$scope.postActivation = function(code) {
			if ($cookies.partyId == null) {
				alert('No partyId found. Check if you are logged in.');
				return;
			}
			if (code == null) {
				alert('Please enter an activation code.');
				return
			}
			$http({
				url: $scope.apiUri+'/subscriptions/',
				data: {
					'partyId': $cookies.partyId ,
					'activationCode': code,
				},
				method: 'POST',
			}).success(function(data, status, headers, config){
				//$scope.tabPage = 'success';
				$state.go("activation.success");
				console.log($state);
			}).error(function(data, status, headers, config){
				//$scope.tabPage = 'error';
				$state.go("activation.error");
				console.log($state);
			});
		}

		$scope.setPage = function(page) {
			//$scope.tabPage = page;
			if (page=="form") {
				$state.go("activation.form");
				console.log($state);
				return;
			}
			if (page=="success") {
				$state.go("activation.success");
				console.log($state);
				return;
			}
			if (page=="error") {
				$state.go("activation.error");
				console.log($state);
				return;
			}
		}

		function init() {
			Title.setTitle(ActivationModel.title);
		
			$scope.partnerId = $location.search()['partnerId'];
			$scope.redirect = $scope.getRedirectNoEncode();
			$http({
				url: $scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
				method: 'GET',
			}).success(function(data, status, headers, config){
				$scope.partner = data[0];
			}).error(function(data, status, headers, config) {
				alert('There was an error retrieving partner object. Please check if the information supplied is correct');
			});
			$scope.tabPage = 'form';
		}
	}
]);
