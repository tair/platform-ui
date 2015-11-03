/**
 * PhoenixIpRange Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.manage').controller(
	/* Name */
	'PhoenixManageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'PhoenixManageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, PhoenixManageModel) {
		$scope.setTitle(PhoenixManageModel.title);
	}
]);
