/**
 * API Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc').controller(
	/* Name */
	'ApiDocController',

	/* Dependencies */
	[
	'$http',
	'$scope',
	'$location',
	"$timeout",
	'Title',

	/* Controller Definition */
	function ($http, $scope, $location, $timeout, Title) {
	    init();
	    function init() {
        Title.setTitle('Subscription Management REST API Documentation');
	    }
	}
]);
