/**forgot pwd Controller
 */

angular.module('platform-ui.adminportal.login.forgotusername.thankyou').controller(
	/* Name */
	'ForgotUsernameTyController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgotUsernameTyModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgotpwdTyModel) {
		$scope.email = $location.search()['email'];
		$scope.back = function(){
			$state.go('ltlogin.page');
		}
	}
]);
