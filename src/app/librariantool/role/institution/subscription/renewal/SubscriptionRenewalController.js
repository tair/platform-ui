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
		return true;
	    };

	    function init() {
		$scope.setTitle(SubscriptionRenewalModel.title);
		$scope.uiparams = SubscriptionRenewalModel.uiparams;
	    }
	}
]);
