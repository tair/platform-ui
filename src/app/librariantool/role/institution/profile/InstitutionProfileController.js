/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.institution.profile').controller(
	/* Name */
	'InstitutionProfileController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionProfileModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionProfileModel) {
	    $scope.setTitle(InstitutionProfileModel.title);
	}
]);
