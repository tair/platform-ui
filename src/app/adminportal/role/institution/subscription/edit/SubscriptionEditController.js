/**
 * SubscriptionEdit Controller
 */

angular.module('platform-ui.adminportal.role.institution.subscription.edit').controller(
	/* Name */
	'SubscriptionEditController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'SubscriptionEditModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, SubscriptionEditModel) {
	    init();
	
	    $scope.back = function() {
		$state.go('role.institution.subscription.list');
	    };

	    $scope.requestEdit = function() {
	    	if ($scope.transactionType == "renew"){
			 	postData = {
			 			"subscriptionId": $scope.activeSubscriptions[$scope.partnerId].subscriptionId,
						"partyId": $scope.institutionId,
						"partnerId": $scope.partnerId,
					};
	    		$http({
	    			url: $scope.apiUri+'/subscriptions/'+$scope.activeSubscriptions[$scope.partnerId].subscriptionId+'/renewal/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	    			method: 'PUT',
	    			data: postData,
	    			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    		}).success(function(){
	    			$scope.successMessage = "Subscription renewed successfully!";
	    		}).error(function() {
	    			alert("Failed to renew subscription!");
	    		});
	    	}else if($scope.transactionType == "create"){
	    		postData = {
//			 			"subscriptionId": $scope.activeSubscriptions[$scope.partnerId].subscriptionId,
						"partyId": $scope.institutionId,
						"partnerId": $scope.partnerId,
					};
	    		$http({
	    			url: $scope.apiUri+'/subscriptions/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	    			method: 'POST',
	    			data: postData,
	    		}).success(function(){
	    			$scope.successMessage = "Subscription created successfully!";
	    		}).error(function() {
	    			alert("Failed to create subscription!");
	    		});
	    	}
//		return true;
	    };

	    function init() {
		$scope.uiparams = SubscriptionEditModel.uiparams;
		$scope.partnerId = $location.search()['partnerId'];
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		if ($scope.partnerId in $scope.activeSubscriptions){
			$scope.transactionType = "renew";
		}else{
			$scope.transactionType = "create";
		}
		$http({
			url: $scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/parties/institutions/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
			method: 'GET',
		}).success(function(data, status, headers, config){
			$scope.partyName = data[0].name;
			$scope.user = data[1];
		}).error(function() {
			alert("User information failed to retrieve");
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
