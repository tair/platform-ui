/**
 * ConsortiumUsage Controller
 */

angular.module('platform-ui.adminportal.role.consortium.usage').controller(
	/* Name */
	'ConsortiumUsageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'ConsortiumUsageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, ConsortiumUsageModel) {
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
						headers: {'Authorization': 'JWT '+$scope.token},
					}).success(function() {
						alert("Your request has been received. We will get back to you shortly.");
						$scope.postData.startDate = null;
						$scope.postData.endDate = null;
						$scope.postData.comments = null;
						$scope.postData.partner = null;
						$scope.postData.name = null;
					}).error(function() {
						alert("Form submit failed");
					});
				};

	    function init() {
	    	$scope.setCurrentTab(ConsortiumUsageModel.currentTab);
			$scope.uiparams = ConsortiumUsageModel.uiparams;
			$scope.postData = ConsortiumUsageModel.postData;
//			if(!$scope.credentialId || !$scope.secretKey){
//				$state.go('ltlogin');
//			}
			$http({
				url: $scope.apiUri+'/parties/consortiums/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+$scope.consortiumId,
				method: 'GET',
                headers: {'Authorization': 'JWT ' + $scope.token},
			}).success(function(data, status, headers, config) {
				$scope.postData.consortium = data[0].name;//TODO: partyType, partyName as parameter
				$scope.postData.email = data[1].email;
				$scope.postData.name = ((data[1].firstName != null)?data[1].firstName:"") 
					+ ((data[1].firstName != null && data[1].lastName != null)?" ":"") + ((data[1].lastName != null)?data[1].lastName:"");
				
				
			}).error(function() {
				alert("failed to get party information");
			});
			$http({
				url: $scope.apiUri+'/partners/',
				method: 'GET',
			}).success(function(data, status, headers, config) {
				$scope.partners = data;
			}).error(function() {
				alert("Cannot get partner information");
			});
			$(function () {
	            $('#startDate').datepicker();
	        });
			$(function () {
	            $('#endDate').datepicker();
	        });
	    }
	}
]);
