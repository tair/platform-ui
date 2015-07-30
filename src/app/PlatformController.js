/**
 * App Controller
 */

angular.module('platform-ui').controller(
	/* Name */
	'PlatformController',

	/* Dependencies */
	[
	'$scope',
	'$cookies',
	'PlatformModel',

	/* Controller Definition */
	function ($scope, $cookies, PlatformModel) {
	    $scope.title = PlatformModel.title;
	    $scope.brand = PlatformModel.brand;
	    $scope.author = PlatformModel.author;
	    $scope.menu = PlatformModel.menu;
	    $scope.apiUri = PlatformModel.apiUri;
	}
]);
