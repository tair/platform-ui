/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.librariantool.role.institution.subscription.request').controller(
	/* Name */
	'SubscriptionRequestController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'SubscriptionRequestModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, SubscriptionRequestModel) {
	    init();
	
	    $scope.back = function() {
		$state.go('role.institution.subscription.list');
	    };

	    $scope.requestQuote = function() {
		postData = {
                        "partnerName": $scope.partner.name,
                        "name": $scope.user.name,
                        "email": $scope.user.email,
                        "institution": $scope.user.institution,
                        "comments": $scope.comments,
                };
                $http({
                        url: $scope.apiUri+'/subscriptions/request/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                        method: 'POST',
                        data: postData,
                }).success(function(){
                		$scope.successMessage = "Thank you for your request! We will get back to you shortly.";
//                        alert("Hey there, we will get back to you shortly");
                        $scope.comments = null;
                }).error(function() {
                        alert("Request quote request not sent");
                });
		return true;
	    };

	    function init() {
		$scope.setTitle(SubscriptionRequestModel.title);
		$scope.uiparams = SubscriptionRequestModel.uiparams;
		$scope.partnerId = $location.search()['partnerId'];
		$http({
			url: $scope.apiUri+'/partners?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
                        url: $scope.apiUri+'/credentials?username='+$cookies.username+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                        method: 'GET',
                }).success(function(data, status, headers, config){
                        $scope.user = data[0];
                }).error(function() {
                        alert("User information failed to retrieve");
                });
	    }
	}
]);
