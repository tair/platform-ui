/**
 * List Controller
 */

angular.module('platform-ui.list').controller(
	/* Name */
	'ListController',

	/* Dependencies */
	[
	'$cookies',
	'$http',
	'$scope',
	'$location',
	'Title',

	/* Controller Definition */
	function ($cookies, $http, $scope, $location, Title) {
		init();

		function init() {
                    Title.setTitle('University List');
		    $scope.partnerId = $location.search()['partnerId'];
		    $http({
			url:'http://azeemapi.steveatgetexp.com/partners/?partnerId='+$scope.partnerId,
			method:'GET',
			withCredentials:true,
		    }).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		    });
		    $http({
                        url:'http://azeemapi.steveatgetexp.com/parties/organizations?partnerId='+$scope.partnerId,
                        method:'GET',
                        withCredentials:true,
                    }).success(function(data, status, headers, config) {
                        $scope.institutions = data.sort();
                    });
		}
	}
]);
