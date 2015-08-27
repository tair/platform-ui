/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.role').controller(
	/* Name */
	'RoleController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'RoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, RoleModel) {
	    $scope.title = RoleModel.title;
	    $scope.home = function() {
		window.location.href='#/librariantool/login';
	    }
	    $scope.logout = function() {
		$scope.home();
	    }
	    $scope.setTitle = function(title) {
		$scope.title = title;
	    }

	    $scope.partyInfo = RoleModel.partyInfo;
	    $scope.email = RoleModel.email;
            $http({
                url: $scope.apiUri+'/parties/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
                method: 'GET',
            }).success(function(data, status, headers, config){
                $scope.partyInfo = data[0];
            }).error(function(data, status, headers, config){
                alert("partyId failed");
            });
	}
]);
