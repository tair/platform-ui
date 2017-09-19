/**forgot username Controller
 */

angular.module('platform-ui.adminportal.login.forgotusername').controller(
	/* Name */
	'ForgotUsernameController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgotUsernameModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgotUsernameModel) {
		$scope.forgotUsername = function() {
			if($scope.email != null) {
				var email = $scope.email.replace('+', '%2B');
				$http({
                    url: $scope.apiUri+'/credentials/getUsernames/?email='+email,
                    method: 'GET',
                }).success(function(data, status, headers, config){
                		$state.go('ltlogin.forgotusername.thankyou', {'email':$scope.email});
                }).error(function(data, status, headers, config){
                	if (data['error'] == 'no username found.'){
                		$scope.invalidEmailMsg = true;
                	}
                });				
			}else{
				alert("Please enter your email!")
			}
		}
		$scope.back = function(){
			$state.go('ltlogin.forgotpassword.sendlink');
		}
	}
]);
