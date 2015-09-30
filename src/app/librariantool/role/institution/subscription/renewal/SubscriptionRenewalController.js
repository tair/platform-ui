/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.librariantool.role.institution.subscription.renewal').controller(
	/* Name */
	'SubscriptionRenewalController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'SubscriptionRenewalModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, SubscriptionRenewalModel) {
	    init();
	
	    $scope.back = function() {
		$state.go('role.institution.subscription.list');
	    };

	    $scope.requestRenewal = function() {
	 	postData = {
			"partnerName": $scope.partner.name,
			"name": $scope.user.name,
			"email": $scope.user.email,
			"institution": $scope.user.institution,
			"comments": $scope.comments,
		};
		$http({
			url: $scope.apiUri+'/subscriptions/renew/',
			method: 'POST',
			data: postData,
		}).success(function(){
			alert("Hey there, we will get back to you shortly");
			$scope.comments = null;
		}).error(function() {
			alert("Renewal request not sent");
		});
		return true;
	    };

	    function init() {
		$scope.setTitle(SubscriptionRenewalModel.title);
		$scope.uiparams = SubscriptionRenewalModel.uiparams;
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
			url: $scope.apiUri+'/credentials?username='+$cookies.username,
			method: 'GET',
		}).success(function(data, status, headers, config){
			$scope.user = data[0];
		}).error(function() {
			alert("User information failed to retrieve");
		});
	    }
	}
]);