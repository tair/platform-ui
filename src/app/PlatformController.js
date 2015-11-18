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
	    
        $http.get('/config/config.json').then(function(res) { 
            config = res.data[0];
            console.log( "PW-186 DEBUG:" + config.paywallApiBaseUri)
        });
	    
	    $scope.title = PlatformModel.title;
	    $scope.brand = PlatformModel.brand;
	    $scope.author = PlatformModel.author;
	    $scope.menu = PlatformModel.menu;
	    $scope.apiUri = PlatformModel.apiUri;
	    $scope.getRedirect = function() {
		return encodeURIComponent($location.search()['redirect']);
	    }
	    $scope.getRedirectNoEncode = function() {
		return $location.search()['redirect'];
	    }
	}
]);
