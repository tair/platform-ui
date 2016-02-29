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
	'$window',
	'$location',
	'$state',
	'Title',
	'InstitutionRoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $cookieStore, $window, $location, $state, Title, InstitutionRoleModel) {
//		if(!$cookies.credentialId || !$cookies.secretKey){
//			$state.go('ltlogin');
//		}
		if(!$cookies.credentialId){
			$scope.credentialId = $cookies.credentialId;
		}else if(!$window.sessionStorage.credentialId){
			$scope.credentialId = $window.sessionStorage.credentialId;
		}
		if(!$cookies.secretKey){
			$scope.secretKey = $cookies.secretKey;
		}else if(!$window.sessionStorage.secretKey){
			$scope.secretKey = $window.sessionStorage.secretKey;
		}
		if(!$scope.credentialId || !$scope.secretKey){
			$state.go('ltlogin');
		}
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
