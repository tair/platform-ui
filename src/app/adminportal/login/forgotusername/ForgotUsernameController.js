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
//			if($scope.email != null) {
//				data={
//						email:$scope.email,
//						partnerId: 'phoenix',
//				}
//				$http({
//                    url: $scope.apiUri+'/credentials/resetPwd/',
//                    data: data,
//                    method: 'POST',
//                }).success(function(data, status, headers, config){
//                	$state.go('ltlogin.forgotpassword.thankyou', {'username':$scope.username});
//                }).error(function(data, status, headers, config){
//                	if(data['reset pwd failed'] == 'No such user'){
//                		$scope.invalidUsernameMsg = true;
//                	}
//                });				
//			}else{
//				alert("Please enter your eamil!")
//			}
		}
		$scope.back = function(){
			$state.go('ltlogin.forgotpassword.sendlink');
		}
	}
]);
