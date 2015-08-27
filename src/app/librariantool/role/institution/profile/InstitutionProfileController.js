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
	    	init();
		console.log($scope.uiparams.colwidth);
		
		$scope.edit_fields = function() {
			if ($scope.edit==true) {
				//validateInfo();
				//Save info
				for(k in $scope.user) $scope.userprev[k] = $scope.user[k];
			}
			$scope.edit = !$scope.edit;
			console.log($scope.edit);
		}

		$scope.cancel = function() {
			$scope.edit = false;
			for(k in $scope.userprev) $scope.user[k] = $scope.userprev[k];
			console.log($scope.edit);
		}

	    	function init() {
	    		$scope.setTitle(InstitutionProfileModel.title);
	    		$scope.user = InstitutionProfileModel.user;
			$scope.userprev = {};
			for(k in $scope.user) $scope.userprev[k] = $scope.user[k];
	    		$scope.edit = false;
			$scope.uiparams = InstitutionProfileModel.uiparams;
	    	}
	}
]);
