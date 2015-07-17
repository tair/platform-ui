/**
 * List Controller
 */

angular.module('platform-ui.list').controller(
	/* Name */
	'ListController',

	/* Dependencies */
	[
	'$http',
	'$scope',
	'$location',
	'Title',

	/* Controller Definition */
	function ($http, $scope, $location, Title) {
		init();

		function init() {
                    Title.setTitle('University List');
		    $scope.partnerId = $location.search()['partnerId'];
		    $http({
			url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
			method:'GET',
		    }).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		    });
		    $http({
                        url:$scope.apiUri+'/parties/organizations?partnerId='+$scope.partnerId,
                        method:'GET',
                    }).success(function(data, status, headers, config) {
                        $scope.institutions = data.sort();
                    });
		}
	}
]);
