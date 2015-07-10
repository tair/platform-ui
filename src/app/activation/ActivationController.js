/**
 * Activation Controller
 */

angular.module('platform-ui.activation').controller(
	/* Name */
	'ActivationController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$location',
	'$cookies',
	'Title',
	'ActivationModel',

	/* Controller Definition */
	function ($scope, $http, $location, $cookies, Title, ActivationModel) {
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
				url: 'http://pb.steveatgetexp.com/subscriptions/',
				data: {
					'partyId': $cookies.partyId ,
					'activationCode': code,
				},
				method: 'POST',
				withCredentials: true,
			}).success(function(data, status, headers, config){
				$scope.tabPage = 'success';
			}).error(function(data, status, headers, config){
				$scope.tabPage = 'error';
			});
		}

		$scope.setPage = function(page) {
			$scope.tabPage = page;
		}

		function init() {
			Title.setTitle(ActivationModel.title);
		
			$scope.partnerId = $location.search()['partnerId'];
			$scope.redirect = $location.search()['redirect'];
			$http({
				url: 'http://pb.steveatgetexp.com/partners/?partnerId='+$scope.partnerId,
				method: 'GET',
				withCredentials: true,
			}).success(function(data, status, headers, config){
				$scope.partner = data[0];
			}).error(function(data, status, headers, config) {
				alert('There was an error retrieving partner object. Please check if the information supplied is correct');
			});
			$scope.tabPage = 'form';
		}
	}
]);
