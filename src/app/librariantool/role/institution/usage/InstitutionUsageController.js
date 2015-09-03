/**
 * InstitutionUsage Controller
 */

angular.module('platform-ui.librariantool.role.institution.usage').controller(
	/* Name */
	'InstitutionUsageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionUsageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionUsageModel) {
	    init();

	    function init() {
	    	$scope.setTitle(InstitutionUsageModel.title);
		$scope.uiparams = InstitutionUsageModel.uiparams;
	    }
	}
]);
