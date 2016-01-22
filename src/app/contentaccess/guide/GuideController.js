/**
 * Guide Controller
 */

angular.module('platform-ui.contentaccess.guide').controller(
	/* Name */
	'GuideController',

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
        Title.setTitle('Troubleshooting guide');
		$scope.partnerId = $location.search()['partnerId'];
		$http({
		    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		});
	    }
	}
]);
