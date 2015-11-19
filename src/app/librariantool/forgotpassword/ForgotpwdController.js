/**forgot pwd Controller
 */

angular.module('platform-ui.librariantool.forgotpassword').controller(
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
	    $scope.formdata = ForgotpwdModel.formdata;
	    $scope.requestAccount = function() {
		alert("requesting account NYI");
	    }
	    $scope.login = function() {
		$scope.partnerId = "phoenix"; // should be phoenix eventually.
                $http({
                    url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId,
                    data: $scope.formdata,
                    method: 'POST',
                }).success(function(data, status, headers, config){
                    $cookies.credentialId = data["credentialId"];
                    $cookies.secretKey = data["secretKey"];
		    $cookies.username = data["username"];
		    $http({
			url: $scope.apiUri+'/parties?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			method: 'GET'
		    }).success(function(data, status, headers, config){
			if (data[0].partyType=="consortium") {
			    $state.go("role.consortium.manage");
			} else if (data[0].partyType=="staff") {
			    $state.go("role.phoenix.manage");
			} else {
			    $state.go("role.institution.iprange");
			}
		    }).error(function() {});
                }).error(function(data, status, headers, config){
                    alert('Login failed');
                });
	    }
	}
]);
