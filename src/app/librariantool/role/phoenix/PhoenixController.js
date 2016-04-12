/**
 * PhoenixRole Controller
 */

angular.module('platform-ui.librariantool.role.phoenix').controller(
	/* Name */
	'PhoenixController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'PhoenixModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, PhoenixModel) {
		//load credential info
		if($cookies.org_phoenixbioinformatics_ui_credentialId!=null){
			$scope.credentialId = $cookies.org_phoenixbioinformatics_ui_credentialId;
		}else if($window.sessionStorage.org_phoenixbioinformatics_ui_credentialId!=null){
			$scope.credentialId = $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId;
		}
		if($cookies.org_phoenixbioinformatics_ui_secretKey!=null){
			$scope.secretKey = $cookies.org_phoenixbioinformatics_ui_secretKey;
		}else if($window.sessionStorage.org_phoenixbioinformatics_ui_secretKey!=null){
			$scope.secretKey = $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey;
		}
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		$scope.setTitle(PhoenixModel.title);
	    $scope.setCurrentTab = function(currentTab){
	    	$scope.currentTab = currentTab;
	    }
		$scope.setPhoenix(false);
            $scope.currentTab = PhoenixModel.currentTab;
            $scope.tabs = PhoenixModel.tabs;
            $scope.navbarLabel = function(tab) {
                if (tab.label == $scope.currentTab.label) {
                    return "lt-navbar-label-highlight";
                }
                return "lt-navbar-label";
            }
            $scope.clickTab = function(tab) {
                $state.go(tab.state);
                $scope.currentTab = tab;
            }
	}
]);
