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
                                put_data["partyId"]=$cookies.credentialId;//vet
                                put_data["username"]=$cookie.username;
                                put_data["partnerId"]=$scope.user.partnerId;
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
                        for(k in $scope.userprev) $scope.user[k] = $scope.userprev[k];
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
                        		//https://demoapi.arabidopsis.org/credentials/?username=andreylib&credentialId=32669&secretKey=Ac76mZWyaI2dcVn5HZeXwVQb5xE%3D
                                url: $scope.apiUri+'/credentials/?username='+$cookies.username+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                                method: 'GET',
                        }).success(function(data, status, headers, config) {
                        	//$scope.user.name = "andrey";PW-161 not needed here, it was just an experiment
                        	//PW-161 calling parties/?partiId WS from within success of /credentials/?username WS
                        	//PW-161 get name from Party table
                            $http({
                                //vet pw-161 UI url: $scope.apiUri+'/parties/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                            	url: $scope.apiUri+'/parties/consortiums/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                            	method: 'GET',
                            }).success(function(data, status, headers, config){
                            	$scope.user.name = data[0].name;//PW-161
                            	$scope.user.partnerId = data[1].partnerId;
                            }).error(function(data, status, headers, config){
                            	errMsg = "Failed to get party information from Party tbl.";
                            	bootbox.alert(errMsg);
                                wsURL = $scope.apiUri+'/parties/consortiums/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey);
                                console.log(errMsg+" "+wsUrl);
                            });
 
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
                        		errMsg = "Failed to get consortium.";
                        		bootbox.alert(errMsg);
                                wsURL = $scope.apiUri+'/credentials/?username='+$cookies.username+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey);
                                console.log(errMsg+" "+wsUrl);
                        });

                        $scope.edit = false;
                        $scope.uiparams = ConsortiumProfileModel.uiparams;
                }

		
	}
]);
