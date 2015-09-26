/**
 * InstitutionUsage Controller
 */

angular.module('platform-ui.librariantool.role.institution.usage').controller(
	/* Name */
	'InstitutionUsageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionUsageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionUsageModel) {
	    init();

	    $scope.validateForm = function() {
					if ($scope.postData.endDate >= $scope.postData.startDate)
						return true;	
					alert("End date must be greater than start date");
					return false;
	    			};

	    $scope.requestUsage = function() {
					$http({
						url: $scope.apiUri+'/parties/usage/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
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
	    	$scope.setTitle(InstitutionUsageModel.title);
		$scope.uiparams = InstitutionUsageModel.uiparams;
		$scope.postData = InstitutionUsageModel.postData;
		$http({
			url: $scope.apiUri+'/credentials/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.postData.institution = data[0].institution;
		}).error(function() {
			alert("failed to get party information");
		});
	    }
	}
]);
