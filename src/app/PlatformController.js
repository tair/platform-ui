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
	    	console.log("getRedirect function with $location.search()['redirect']:"+$location.search()['redirect']);
	    	encodedRedirURL = encodeURIComponent($location.search()['redirect']);
	    	console.log("getRedirect function. encodedRedirURL:"+encodedRedirURL);
		    return encodedRedirURL;
	    }
	    $scope.getRedirectNoEncode = function() {
	    	console.log("getRedirectNoEncode function. $location.search()['redirect']"+$location.search()['redirect']);
		    return $location.search()['redirect'];
	    }
	}
]);
