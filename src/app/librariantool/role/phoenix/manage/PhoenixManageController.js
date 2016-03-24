/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.manage').controller(
	/* Name */
	'PhoenixManageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'PhoenixManageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, PhoenixManageModel) {		
		if(!$scope.credentialId || !$scope.secretKey){
			$state.go('ltlogin');
		}
		$scope.setTitle(PhoenixManageModel.title);
	    $scope.selectedInstitution = PhoenixManageModel.selectedInstitution;
	    $scope.setInstitution = function(institution) {
		$scope.selectedInstitution = institution;
	    }
	    $state.go("role.phoenix.manage.consortium");
	}
]);
