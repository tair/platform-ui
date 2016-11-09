/**
 * Error Controller
 */

angular.module('platform-ui.error').controller(
		/* Name */
		'ErrorController',

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
		        Title.setTitle('Error page');
				$scope.partnerId = $location.search()['partnerId'];
				$scope.errorMsg = $location.search()['error'];
				if ($scope.partnerId != null) {
					$http({
						url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
						method:'GET',
					}).success(function(data, status, headers, config) {
						$scope.partner = data[0];
					});
				}
		    }
		}
	]);