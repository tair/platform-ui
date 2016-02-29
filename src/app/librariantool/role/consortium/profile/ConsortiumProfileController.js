/**
 * ConsortiumIpRange Controller
 */

angular.module('platform-ui.librariantool.role.consortium.profile').controller(
	/* Name */
	'ConsortiumProfileController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumProfileModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumProfileModel) {
		init();
		$scope.edit_fields = function() {
                        if ($scope.edit==true) {
                                if (!validateInfo()) {
                                		bootbox.alert("Information not valid");
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
                                put_data["partyId"]  = $scope.user.partyId; //$cookies.credentialId;
                                //put_data["username"] = $scope.user.username;
                                put_data["partnerId"]= $scope.user.partnerId;
                                $http({
                                        //vet pw-161 UI url: $scope.apiUri+'/credentials/profile/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                                        url: $scope.apiUri+'/parties/consortiums/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                                        data: put_data,
                                        method: 'PUT',
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                }).success(function(){
                                	bootbox.alert("Consortium Successfuly Updated!");
                                }).error(function() {
                                	bootbox.alert("Failed to update user info");
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
                        $scope.setTitle(ConsortiumProfileModel.title);
                        $scope.user = ConsortiumProfileModel.user;
                        $http({
                                //url: $scope.apiUri+'/credentials/?username='+$cookies.username+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                        	    url: $scope.apiUri+'/parties/consortiums/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                                method: 'GET',
                        }).success(function(data, status, headers, config) {
                            	/*
                            	     {
									    "partyId": 2,
									    "partyType": "user",
									    "name": "Google Staf6",
									    "country": 170,
									    "display": false,
									    "consortiums": []
									  },
									  {
									    "username": "googlestaff",
									    "password": "4b919cea2835bf20e4c9576e107c4eaf42682a11",
									    "email": "andrey@arabidopsis.org",
									    "institution": "Google",
									    "partyId": 2,
									    "partnerId": "phoenix",
									    "userIdentifier": "123456789"
									  }
                            	 */
                        		$scope.user.partyId = data[0].partyId;
                        		$scope.user.partyType = data[0].partyType;
                            	$scope.user.name = data[0].name;
                            	$scope.user.country = data[0].country;
                            	$scope.user.display = data[0].display;
                            	$scope.user.consortiums = data[0].consortiums;
                            	
                            	$scope.user.username = data[1].username;
                            	$scope.user.password = "random";
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
                            	errMsg = "GET /parties/consortiums/ Failed";
                            	bootbox.alert(errMsg);
                            });

                        $scope.edit = false;
                        $scope.uiparams = ConsortiumProfileModel.uiparams;
                }
	}
]);
