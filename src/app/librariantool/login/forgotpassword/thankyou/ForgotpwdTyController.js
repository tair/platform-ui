/**forgot pwd Controller
 */

angular.module('platform-ui.librariantool.login.forgotpassword.thankyou').controller(
	/* Name */
	'ForgotpwdTyController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgotpwdTyModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgotpwdTyModel) {
		$scope.email = $location.search()['email'];
		$scope.back = function(){
			$state.go('ltlogin.page');
		}
	}
]);
