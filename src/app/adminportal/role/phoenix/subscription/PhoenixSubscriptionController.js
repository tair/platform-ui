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
	function ($scope, $http, $cookies, $window, $location, $state, Title, PhoenixProfileModel) {
	    init();
	    
	    $scope.downloadRequest = function(){
	    		//$window.location.href = $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey);
	    	$http({
				url: $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
				method: 'GET',
				headers: {'Authorization': 'JWT '+$scope.token},
			    }).success(function(data, status, headers, config){
			    	var file = new File([data], "report.txt", {type: "text/plain;charset=utf-8"});
			    	saveAs(file);
			    	console.log('downloadRequest success.');
			    }).error(function() {
			    	console.log('downloadRequest error.');
			    });
	    }
	    $scope.downloadLink = $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey);
	    	function init() {
	    		$scope.setCurrentTab(PhoenixProfileModel.currentTab);
//				if(!$scope.credentialId || !$scope.secretKey){
//					$state.go('ltlogin');
//				}
                }
	}
]);
