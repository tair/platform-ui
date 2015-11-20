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
	    
	    console.log('DEBUG PW-186: PlatformController::controller()');
	    
        //$scope.apiUri = PlatformModel.apiUri; // PW-186: HACK: Workaround for the subsequent ASYNC HTTP request.

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
