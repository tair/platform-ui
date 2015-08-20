/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.login').controller(
	/* Name */
	'LTLoginController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'LTLoginModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, LTLoginModel) {
	    $scope.formdata = LTLoginModel.formdata;
	    $scope.requestAccount = function() {
		alert("requesting account NYI");
	    }
	    $scope.login = function() {
		$scope.partnerId = "tair"; // should be phoenix eventually.
                $http({
                    url: $scope.apiUri+'/users/login/?partnerId='+$scope.partnerId,
                    data: $scope.formdata,
                    method: 'POST',
                }).success(function(data, status, headers, config){
                    $cookies.partyId = data["partyId"];
                    $cookies.secret_key = data["secret_key"];
                    $state.go("role.institution.iprange");
                }).error(function(data, status, headers, config){
                    alert('Login failed');
                });
	    }
	}
]);
