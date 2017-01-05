/**
 * API Doc Controller
 */

angular.module('platform-ui.contentaccess.guide').controller(
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
        Title.setTitle('Phoenix REST API Documentation');
	    }
	}
]);
