/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.login').controller(
	/* Name */
	'LTLoginController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'LTLoginModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, LTLoginModel) {
		$state.go("ltlogin.page");
	}
]);
