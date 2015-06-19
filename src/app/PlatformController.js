/**
 * App Controller
 */

angular.module('platform-ui').controller(
	/* Name */
	'PlatformController',

	/* Dependencies */
	[
	'$scope',
	'PlatformModel',

	/* Controller Definition */
	function ($scope, PlatformModel) {
		$scope.title = PlatformModel.title;
		$scope.brand = PlatformModel.brand;
		$scope.author = PlatformModel.author;
		$scope.menu = PlatformModel.menu;
	}
]);