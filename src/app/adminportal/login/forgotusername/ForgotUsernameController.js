/**forgot pwd Controller
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
			if($scope.username != null) {
				data={
						user:$scope.username,
						partnerId: 'phoenix',
				}
				$http({
                    url: $scope.apiUri+'/credentials/resetPwd/',
                    data: data,
                    method: 'POST',
                }).success(function(data, status, headers, config){
                	$state.go('ltlogin.forgotpassword.thankyou', {'username':$scope.username});
                }).error(function(data, status, headers, config){
                	if(data['reset pwd failed'] == 'No such user'){
                		$scope.invalidUsernameMsg = true;
                	}
                });				
			}else{
				alert("Please enter your username!")
			}
		}
		$scope.back = function(){
			$state.go('ltlogin.forgotpassword');
		}
	}
]);
