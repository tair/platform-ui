/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.adminportal.role.consortium.subscription.renewal').controller(
	/* Name */
	'ConsortiumSubscriptionRenewalController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumSubscriptionRenewalModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumSubscriptionRenewalModel) {
	    init();
	
	    $scope.back = function() {
		$state.go('role.consortium.subscription.list');
	    };

	    $scope.requestRenewal = function() {
	    	if ($scope.user.firstName != null){
	    		firstName = $scope.user.firstName;
	    	}else{
	    		firstName = 'unknown';
	    	}
	    	if ($scope.user.lastName != null){
	    		lastName = $scope.user.lastName;
	    	}else{
	    		lastName = 'unknown';
	    	}
	    	if ($scope.user.email != null){
	    		email = $scope.user.email;
	    	}else{
	    		email = 'unknown';
	    	}
	    	if ($scope.comments != null){
	    		comments = $scope.comments;
	    	}else{
	    		comments = 'No comment.';
	    	}
	    	postData = {
				"firstName": firstName,
				"lastName": lastName,
                "email": email,
                "institution": $scope.partyName,
                "librarianName": $scope.librarianName,
                "librarianEmail": $scope.librarianEmail,
                "comments": comments,
                "partnerId": $scope.partnerId,
                "requestType": "renewal",
            };
                $http({
                        url: $scope.apiUri+'/subscriptions/subscriptionrequest/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                        method: 'POST',
                        data: postData,
                }).success(function(){
                		$scope.successMessage = "Thank you for your request! We will get back to you shortly.";
                        $scope.comments = null;
                }).error(function() {
                        alert("Renewal request not sent");
                });
		return true;
	    };

	    function init() {
		$scope.uiparams = ConsortiumSubscriptionRenewalModel.uiparams;
		$scope.partnerId = $location.search()['partnerId'];
		//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		$http({
			url: $scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.consortiumId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
			method: 'GET',
		}).success(function(data, status, headers, config){
			$scope.consortium = data[0].name;
			$scope.user = data[1];
		}).error(function() {
			alert("User information failed to retrieve");
		});
	    }
	}
]);
