/**
 * PhoenixSubscription Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.subscription').controller(
	/* Name */
	'PhoenixSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'PhoenixSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, PhoenixSubscriptionModel) {
	    init();

	    function init() {
		console.log($state);
		$scope.setTitle(PhoenixSubscriptionModel.title);
		$scope.partners = PhoenixSubscriptionModel.partners;
		$scope.activeSubscriptions = PhoenixSubscriptionModel.activeSubscriptions;
		$scope.uiparams = PhoenixSubscriptionModel.uiparams;
		$http({
			url: $scope.apiUri+'/partners/?authority=amdin',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$cookies.credentialId+'/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.activeSubscriptions = data;
		}).error(function() {
			alert("Cannot get active subscription information");
		});
		$state.go('role.phoenix.subscription.list');
	    }
	}
]);
