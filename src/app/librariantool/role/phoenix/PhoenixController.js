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
	'$location',
	'$state',
	'Title',
	'PhoenixModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, PhoenixModel) {
		if(!$cookies.credentialId || !$cookies.secretKey){
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
