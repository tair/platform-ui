/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.librariantool.role.institution.subscription.list').controller(
	/* Name */
	'SubscriptionListController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'SubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, SubscriptionListModel) {
	    init();

	    $scope.getExpDate = function(id) {
		if (id in $scope.activeSubscriptions) {
			return $scope.activeSubscriptions[id].endDate;
		}
		return "Unlicensced";
	    };

	    $scope.licenseButton = function(id) {
		if (id in $scope.activeSubscriptions) {
			return "RENEW LICENCSE";
		}
		return "REQUEST LICENCSE";
	    };

	    $scope.licenseAction = function(id) {
		if (id in $scope.activeSubscriptions) {
			$state.go('role.institution.subscription.renewal', {'partnerId': id});
		} else {
			$state.go('role.institution.subscription.request', {'partnerId': id});
		}
	    } 

	    function init() {
		console.log($state);
		$scope.setTitle(SubscriptionListModel.title);
		$scope.uiparams = SubscriptionListModel.uiparams;
	    }
	}
]);
