/**
 * InstitutionRole Controller
 */

angular.module('platform-ui.librariantool.role.institution').controller(
	/* Name */
	'InstitutionRoleController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionRoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionRoleModel) {
		if(!$cookies.credentialId || !$cookies.secretKey){
			$state.go('platform-ui.librariantool.login');
		}
	    $scope.currentTab = InstitutionRoleModel.currentTab;
	    $scope.tabs = InstitutionRoleModel.tabs;
	    $scope.navbarLabel = function(tab) {
		if (tab.label == $scope.currentTab.label) {
		    return "lt-navbar-label-highlight";
		} 
		return "lt-navbar-label";
	    }
	    $scope.navbarLine = function(tab) {
                if (tab.label == $scope.currentTab.label) {
                    return "show";
                }
                return "hide";
	    }
	    $scope.toTab = function(tab) {
		$state.go(tab.state);
		$scope.currentTab = tab;
	    }
	}
]);
