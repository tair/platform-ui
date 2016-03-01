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
	'$window',
	'$location',
	'$state',
	'Title',
	'InstitutionProfileModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, InstitutionProfileModel) {
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
				//put original values from GET
                put_data["partyId"]  = $scope.user.partyId; //$cookies.credentialId;
                put_data["username"] = $scope.user.username;
                put_data["partnerId"]= $scope.user.partnerId;
                put_data["password"]= $scope.user.password;
                
                //rewrite with new from UI
				for(k in $scope.user) {
					if ($scope.userprev[k] != $scope.user[k]) {
						put_data[k] = $scope.user[k];
						$scope.userprev[k] = $scope.user[k];
					}
				}

				$http({
					//url: $scope.apiUri+'/credentials/profile/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
					url: $scope.apiUri+'/parties/institutions/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
					data: put_data,
					method: 'PUT',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).success(function(){
					bootbox.alert("Successfuly Updated!");
				}).error(function() {
					alert("Failed to update user info");
				});
			}
			$scope.edit = !$scope.edit;
		}

		$scope.cancel = function() {
			$scope.edit = false;
			for(k in $scope.userprev) 
				$scope.user[k] = $scope.userprev[k];
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
	    		//load credential
			    if($cookies.credentialId!=null){
					$scope.credentialId = $cookies.credentialId;
				}else if($window.sessionStorage.credentialId!=null){
					$scope.credentialId = $window.sessionStorage.credentialId;
				}
				if($cookies.secretKey!=null){
					$scope.secretKey = $cookies.secretKey;
				}else if($window.sessionStorage.secretKey!=null){
					$scope.secretKey = $window.sessionStorage.secretKey;
				}

	            $http({
	            	//instead of /parties/?partyId= call /parties/institutions/?partyId
	                url: $scope.apiUri+'/parties/institutions/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
	                method: 'GET',
	            }).success(function(data, status, headers, config){
                        		$scope.user.partyId = data[0].partyId;
                        		$scope.user.partyType = data[0].partyType;
                            	$scope.user.name = data[0].name;
                            	$scope.user.country = data[0].country;
                            	$scope.user.display = data[0].display;
                            	$scope.user.consortiums = data[0].consortiums;
                            	
                            	$scope.user.username = data[1].username;
                            	//$scope.user.password = "random";
                                $scope.user.email = data[1].email;
                                $scope.user.institution = data[1].institution;
                                //$scope.user.partyId = data[1].partyId;
                                $scope.user.partnerId = data[1].partnerId;
                                $scope.user.userIdentifier = data[1].userIdentifier;
                                
                                $scope.userprev = {};
                                for(k in $scope.user) 
                                	$scope.userprev[k] = $scope.user[k];
                                
                                $scope.email_validate = $scope.user.email;
                                $scope.email_validate_prev = $scope.email_validate;
                                $scope.password_validate = $scope.user.password;
                                $scope.password_validate_prev = $scope.password_validate;
                                
                                console.log($scope.user);
                                console.log($scope.userprev);
                                
                            }).error(function(data, status, headers, config){
                            	errMsg = "GET /parties/institutions/ Failed";
                            	bootbox.alert(errMsg);
                            });

                        $scope.edit = false;
                        $scope.uiparams = InstitutionProfileModel.uiparams;
                }
	}
]);
