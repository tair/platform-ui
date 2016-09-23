/**
 * Metering Controller
 */

angular.module('platform-ui.contentaccess.metering').controller(
	/* Name */
	'MeteringController',

	/* Dependencies */
	[
	'$scope',
	'$location',
	'$http',
	    '$cookies',
	'Title',
	'MeteringModel',

	/* Controller Definition */
	function ($scope, $location, $http, $cookies, Title, MeteringModel) {
		init();
		$http({
			url:$scope.apiUri+'/partners/descriptions/?partnerId='+$scope.partnerId+'&includeText=True',
			method:'GET',
		}).success(function(data, status, headers, config) {
			$scope.licenses=data;
		}).error(function(data, status, headers, config) {
		    alert("There was an error getting license information about partner. Make sure the partnerId is correct.");
		});
		$scope.license = 'def';
		function init(){
			Title.setTitle(MeteringModel.title);
			$scope.partnerId = $location.search()['partnerId'];
			$scope.exceed = $location.search()['exceed'];
			$http({
				url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
				method:'GET',
			}).success(function(data, status, headers, config) {
				$scope.partner = data[0];
				$scope.redirect = $scope.partner['defaultLoginRedirect'];
			    $scope.redirectNoEncode = decodeURIComponent($scope.partner['defaultLoginRedirect']);
			}).error(function(data, status, headers, config){
				alert("There was an error getting partner information.");
			});
		}
	}
]);
