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

	    // AngularJS 1.3.x does not allow setting domain and path for 
	    // cookies. Doing it the "old fashion way" until we upgrade it to
	    // 1.4.x. -SC
	    document.cookie="apiKey=test123;domain=.steveatgetexp.com;path=/"
	    //$cookies.apiKey = PlatformModel.apiKey;
	}
]);
