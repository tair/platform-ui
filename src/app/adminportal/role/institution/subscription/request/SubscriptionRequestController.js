/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.adminportal.role.institution.subscription.request').controller(
	/* Name */
	'SubscriptionRequestController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'SubscriptionRequestModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, SubscriptionRequestModel) {
	    init();
	
	    $scope.back = function() {
		$state.go('role.institution.subscription.list');
	    };

	    $scope.requestQuote = function() {
		postData = {
						"firstName": $scope.user.firstName,
						"lastName": $scope.user.lastName,
                        "email": $scope.user.email,
                        "institution": $scope.partyName,
                        "librarianName": $scope.user.firstName + " " + $scope.user.lastName,
                        "librarianEmail": $scope.user.email,
                        "comments": $scope.comments,
                        "partnerId": $scope.partnerId,
                };
                $http({
                        url: $scope.apiUri+'/subscriptions/subscriptionrequest/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                        method: 'POST',
                        data: postData,
                }).success(function(){
                		$scope.successMessage = "Thank you for your request! We will get back to you shortly.";
                        $scope.comments = null;
                }).error(function() {
                        alert("Request quote request not sent");
                });
		return true;
	    };

	    function init() {
		$scope.uiparams = SubscriptionRequestModel.uiparams;
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
                        url: $scope.apiUri+'/parties/institutions/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                        method: 'GET',
                }).success(function(data, status, headers, config){
                		$scope.partyName = data[0].name;
                        $scope.user = data[1];
                }).error(function() {
                        alert("User information failed to retrieve");
                });
	    }
	}
]);
