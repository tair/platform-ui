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
	    $scope.setTitle(InstitutionUsageModel.title);
	}
]);
