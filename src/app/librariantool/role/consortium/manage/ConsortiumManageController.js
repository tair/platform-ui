/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.consortium.manage').controller(
	/* Name */
	'ConsortiumManageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumManageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumManageModel) {
	    $scope.selectedInstitution = ConsortiumManageModel.selectedInstitution;
	    $scope.setInstitution = function(institution) {
		$scope.selectedInstitution = institution;
	    }
	    $state.go("role.consortium.manage.consortium");
	}
]);
