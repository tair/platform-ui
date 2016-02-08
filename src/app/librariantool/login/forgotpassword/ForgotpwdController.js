/**forgot pwd Controller
 */

angular.module('platform-ui.librariantool.login.forgotpassword').controller(
	/* Name */
	'ForgotpwdController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgotpwdModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgotpwdModel) {
//		$scope.email = null;
		$scope.forgotPwd = function() {
			if($scope.email != null) {
				data={
						email:$scope.email
				}
				$http({
                    url: $scope.apiUri+'/subscriptions/institutions1/',
                    data: data,
                    method: 'POST',
                }).success(function(data, status, headers, config){   
                }).error(function(data, status, headers, config){
                    alert('Sending email failed');
                });
				$state.go('ltlogin.forgotpassword.thankyou', {'email':$scope.email});
			}else{
				alert("Please enter your email address!")
			}
		}
		$scope.back = function(){
			$state.go('ltlogin.page');
		}
	}
]);
