/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.institution.profile').controller(
	/* Name */
	'InstitutionProfileController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionProfileModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionProfileModel) {
	    	init();
		console.log($scope.uiparams.colwidth);
		
		$scope.edit_fields = function() {
			if ($scope.edit==true) {
				if (!validateInfo()) {
					alert("Information not valid");
					return false;
				}
				//Save info
				put_data = {}
				for(k in $scope.user) {
					if ($scope.userprev[k] != $scope.user[k]) {
						put_data[k] = $scope.user[k];
						$scope.userprev[k] = $scope.user[k];
					}
				}
				$http({
					url: $scope.apiUri+'/credentials/profile/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
					data: put_data,
					method: 'PUT',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).success(function(){

				}).error(function() {
					alert("Failed to update user info");
				});
			}
			$scope.edit = !$scope.edit;
		}

		$scope.cancel = function() {
			$scope.edit = false;
			for(k in $scope.userprev) $scope.user[k] = $scope.userprev[k];
			$scope.email_validate = $scope.email_validate_prev;
			$scope.password_validate = $scope.password_validate_prev;
		}

		function validateInfo() {
			if ($scope.user.email.$invalid) {
				console.log("User email is invalid");
				alert("Email not valid");
				return false;
			}
			if ($scope.user.email!=$scope.email_validate) {
				console.log("User email is "+$scope.user.email+" and validate email is "+$scope.email_validate);
				return false;
			}
			if ($scope.user.password!=$scope.password_validate) {
				console.log("User password is "+$scope.user.password+" and validate password is "+$scope.password_validate);
				return false;
			}
			return true;
		}

	    	function init() {
	    		$scope.setTitle(InstitutionProfileModel.title);
	    		$scope.user = InstitutionProfileModel.user;
			$http({
				url: $scope.apiUri+'/credentials/?username='+$cookies.username+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
				method: 'GET',
			}).success(function(data, status, headers, config) {
				$scope.user.name = data[0].name;
				$scope.user.username = data[0].username;
				$scope.user.email = data[0].email;
				$scope.user.institution = data[0].institution;
				$scope.user.password = "random";
				$scope.userprev = {};
				for(k in $scope.user) $scope.userprev[k] = $scope.user[k];
				$scope.email_validate = $scope.user.email;
				$scope.email_validate_prev = $scope.email_validate;
				$scope.password_validate = $scope.user.password;
				$scope.password_validate_prev = $scope.password_validate;
				console.log($scope.user);
				console.log($scope.userprev);
			}).error(function() {
				alert("Failed to get party information");
			});
	    		$scope.edit = false;
			$scope.uiparams = InstitutionProfileModel.uiparams;
	    	}
	}
]);
