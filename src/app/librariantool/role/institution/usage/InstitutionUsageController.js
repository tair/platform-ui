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
						url: $scope.apiUri+'/parties/usage/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
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
		    //load credential
		    if($cookies.credentialId!=null){
				$scope.credentialId = $cookies.credentialId;
			}else if($window.sessionStorage.credentialId!=null){
				$scope.credentialId = $window.sessionStorage.credentialId;
			}
			if($cookies.secretKey!=null){
				$scope.secretKey = $cookies.secretKey;
			}else if($window.sessionStorage.secretKey!=null){
				$scope.secretKey = $window.sessionStorage.secretKey;
			}
			$http({
				url: $scope.apiUri+'/credentials/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+$scope.credentialId,
				method: 'GET',
			}).success(function(data, status, headers, config) {
				$scope.postData.institution = data[0].institution;
			}).error(function() {
				alert("failed to get party information");
			});
	    }
	}
]);
