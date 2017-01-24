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
			 			"subscriptionId": $scope.allSubscriptions[$scope.partnerId].subscriptionId,
						"partyId": $scope.institutionId,
						"partnerId": $scope.partnerId,
						"startDate": $scope.postData.startDate + ' 12:00:00.0',
						"endDate": $scope.postData.endDate + ' 12:00:00.0',
					};
	    		$http({
	    			url: $scope.apiUri+'/subscriptions/'+$scope.allSubscriptions[$scope.partnerId].subscriptionId+'/renewal/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	    			method: 'PUT',
	    			data: postData,
	    			headers: {
	    				'Content-Type': 'application/x-www-form-urlencoded',
	    				'Authorization': 'JWT '+$scope.token,
	    			},
	    		}).success(function(data, status, headers, config){
	    			$scope.allSubscriptions[$scope.partnerId].startDate = data['startDate'];
	    			$scope.allSubscriptions[$scope.partnerId].endDate = data['endDate'];
	    			$scope.successMessage = "Subscription renewed successfully!";
	    		}).error(function() {
	    			alert("Failed to renew subscription!");
	    		});
	    	}else if($scope.transactionType == "create"){
	    		postData = {
						"partyId": $scope.institutionId,
						"partnerId": $scope.partnerId,
						"startDate": $scope.postData.startDate + ' 12:00:00.0',
						"endDate": $scope.postData.endDate + ' 12:00:00.0',
					};
	    		$http({
	    			url: $scope.apiUri+'/subscriptions/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	    			method: 'POST',
	    			data: postData,
	    		}).success(function(data, status, headers, config){
	    			delete data['subscriptionTransactionId'];
	    			$scope.allSubscriptions[$scope.partnerId] = data;
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
		if ($scope.partnerId in $scope.allSubscriptions){
			$scope.transactionType = "renew";
			$scope.startDate = $scope.allSubscriptions[$scope.partnerId].startDate.split('T')[0];
			$scope.endDate = $scope.allSubscriptions[$scope.partnerId].endDate.split('T')[0];
		}else{
			$scope.transactionType = "create";
		}
		$(function () {
            $('#startDate').datepicker({
        		dateFormat: "yy-mm-dd"
            });
        });
		$(function () {
            $('#endDate').datepicker({
        		dateFormat: "yy-mm-dd"
            });
        });
	    }
	}
]);
