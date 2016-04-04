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
		if($cookies.credentialId!=null){
			$scope.credentialId = $cookies.credentialId;
		}else if($window.sessionStorage.credentialId!=null){
			$scope.credentialId = $window.sessionStorage.credentialId;
		}
		if($cookies.secretKey!=null){
			$scope.secretKey = $cookies.secretKey;
		}else if($window.sessionStorage.secretKey!=null){
			$scope.secretKey = $window.sessionStorage.secretKey;
		}
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
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
