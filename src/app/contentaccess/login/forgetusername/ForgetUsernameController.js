/** Forget username Controller
 */

angular.module('platform-ui.contentaccess.login.forgetusername').controller(
	/* Name */
	'ForgetUsernameController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ForgetUsernameModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ForgetUsernameModel) {
		init();

		$scope.sendUsernames = function() {
			if($scope.email != null) {
				var email = $scope.email.replace('+', '%2B');
				$scope.partnerId = 'tair';
				$http({
                    url: $scope.apiUri+'/credentials/getUsernames/?email='+email+'&partnerId='+$scope.partnerId,
                    method: 'GET',
                }).success(function(data, status, headers, config){
                	$state.go('login.forgetusername.thankyou', {'email':$scope.email});
                }).error(function(data, status, headers, config){
                	// temporary solution
                	if (data == undefined) {
                		$scope.invalidEmailMsg = true;
                	} else if (data['error'] == 'no username found.'){
                		$scope.invalidEmailMsg = true;
                	}
                });				
			}else{
				alert("Please enter your email!")
			}
		}
		$scope.backToLogin = function(){
			$scope.templateHeader.text = 'Log in';
            $state.go('login.form');
		}

		function init() {
			$scope.templateHeader.text = 'Forget Username';
		}

	}
]);
