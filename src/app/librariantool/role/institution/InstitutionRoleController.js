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
	'$cookieStore',
	'$location',
	'$state',
	'Title',
	'InstitutionRoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $cookieStore, $location, $state, Title, InstitutionRoleModel) {
		if($cookieStore.get('currentTab')){
			$scope.currentTab = $cookieStore.get('currentTab');
		}else{
			$scope.currentTab = InstitutionRoleModel.currentTab;
		}
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
		$cookieStore.put('currentTab', $scope.currentTab);
	    }
	}
]);
