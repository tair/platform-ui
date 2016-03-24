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
