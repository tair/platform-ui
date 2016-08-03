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
	    	$http({
	    		url: $scope.apiUri+'/subscription/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	    	    method: 'GET',
	    	}).success(function(data, status, headers, config){	    		
	    	}).error(function(data, status, headers, config){	    		
	    	});
	    }

	    	function init() {
	    		$scope.setCurrentTab(PhoenixProfileModel.currentTab);
//				if(!$scope.credentialId || !$scope.secretKey){
//					$state.go('ltlogin');
//				}
                }
	}
]);
