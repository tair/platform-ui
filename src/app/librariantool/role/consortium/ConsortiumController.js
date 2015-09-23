/**
 * Consortium Controller
 */

angular.module('platform-ui.librariantool.role.consortium').controller(
	/* Name */
	'ConsortiumController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumModel) {
            $scope.currentTab = ConsortiumModel.currentTab;
            $scope.tabs = ConsortiumModel.tabs;
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
