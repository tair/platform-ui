/**
 * Request Account Controller
 */

angular.module('platform-ui.librariantool.login.requestaccount').controller(
	/* Name */
	'RequestAccountController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'RequestAccountModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, RequestAccountModel) {
		$scope.sendEmail = function(){
			
		}
		$scope.back = function() {
			$state.go("ltlogin.page");
		}
	}
]);
