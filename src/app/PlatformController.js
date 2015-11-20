/**
 * App Controller
 */

angular.module('platform-ui').controller(
	/* Name */
	'PlatformController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'PlatformModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, PlatformModel) {
	    
	    $scope.title = PlatformModel.title;
	    $scope.brand = PlatformModel.brand;
	    $scope.author = PlatformModel.author;
	    $scope.menu = PlatformModel.menu;
	    $scope.getRedirect = function() {
		    return encodeURIComponent($location.search()['redirect']);
	    }
	    $scope.getRedirectNoEncode = function() {
		    return $location.search()['redirect'];
	    }
	}
]);
