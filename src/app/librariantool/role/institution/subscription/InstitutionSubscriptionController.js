/**
 * InstitutionSubscription Controller
 */

angular.module('platform-ui.librariantool.role.institution.subscription').controller(
	/* Name */
	'InstitutionSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionSubscriptionModel) {
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

	    function init() {
		$scope.setTitle(InstitutionSubscriptionModel.title);
		$scope.partners = InstitutionSubscriptionModel.partners;
		$scope.activeSubscriptions = InstitutionSubscriptionModel.activeSubscriptions;
		$scope.uiparams = InstitutionSubscriptionModel.uiparams;
	    }
	}
]);
