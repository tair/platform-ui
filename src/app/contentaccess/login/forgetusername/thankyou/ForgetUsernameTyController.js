/**forget user name thank you page Controller
 */

angular.module('platform-ui.contentaccess.login.forgetusername.thankyou').controller(
	/* Name */
	'ForgetUsernameTyController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgetUsernameTyModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgetUsernameTyModel) {
		$scope.email = $location.search()['email'];
		$scope.backToLogin = function(){
			$state.go('login.form');
		}
	}
]);
