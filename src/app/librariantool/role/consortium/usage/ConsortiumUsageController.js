/**
 * ConsortiumUsage Controller
 */

angular.module('platform-ui.librariantool.role.consortium.usage').controller(
	/* Name */
	'ConsortiumUsageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumUsageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumUsageModel) {
		init();
		$scope.validateForm = function() {
					if ($scope.endDate >= $scope.startDate)
						return true;
					alert("End date must be greater than start date");
					return false;
				};
		$scope.requestUsage = function() {
					$http({
						url: $scope.apiUri+'/parties/usage/?partyId='+$scope.selectedInstitution.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
						method: 'POST',
						data: $scope.postData,
					}).success(function() {
						alert("Your request has been recieved. We will get back to you shortly.");
						$scope.postData.startDate = null;
						$scope.postData.endDate = null;
						$scope.postData.comments = null;
					}).error(function() {
						alert("Form submit failed");
					});
				};
		function init() {
			$scope.setTitle(ConsortiumUsageModel.title);
			$scope.uiparams = ConsortiumUsageModel.uiparams;
			$scope.postData = ConsortiumUsageModel.postData;
			$http({
				url: $scope.apiUri+'/credentials/?partyId='+$scope.selectedInstitution.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
				method: 'GET',
			}).success(function(data, status, headers, config) {
				$scope.postData.institution = data[0].institution;
			}).error(function() {
				alert("failed to get party information");
			});
		}
	}
]);
