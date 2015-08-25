/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.role').controller(
	/* Name */
	'RoleController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'RoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, RoleModel) {
	    $scope.title = RoleModel.title;
	    $scope.home = function() {
		window.location.href='#/librariantool/login';
	    }
	    $scope.logout = function() {
		$scope.home();
	    }
	    $scope.setTitle = function(title) {
		$scope.title = title;
	    }
	}
]);
