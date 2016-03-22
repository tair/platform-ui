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
	'$window',
	'$location',
	'$state',
	'Title',
	'InstitutionRoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, InstitutionRoleModel) {
		if($cookies.ui_credentialId!=null){
			$scope.credentialId = $cookies.ui_credentialId;
		}else if($window.sessionStorage.ui_credentialId!=null){
			$scope.credentialId = $window.sessionStorage.ui_credentialId;
		}
		if($cookies.ui_secretKey!=null){
			$scope.secretKey = $cookies.ui_secretKey;
		}else if($window.sessionStorage.ui_secretKey!=null){
			$scope.secretKey = $window.sessionStorage.ui_secretKey;
		}
		if(!$scope.credentialId || !$scope.secretKey){
			$state.go('ltlogin');
		}
		$scope.tabs = InstitutionRoleModel.tabs;
		if($window.sessionStorage.currentTab!=null
			&&$window.sessionStorage!=undefined){
			$scope.currentTab = JSON.parse($window.sessionStorage.currentTab);
		}else{
			$scope.currentTab = InstitutionRoleModel.currentTab;
		}
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
		$window.sessionStorage.currentTab = JSON.stringify(tab);
	    }
	    $state.go($scope.currentTab.state);
	}
]);
