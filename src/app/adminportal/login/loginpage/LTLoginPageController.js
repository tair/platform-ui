/**
 * Login Page Controller
 */

angular.module('platform-ui.adminportal.login.page').controller(
	/* Name */
	'LTLoginPageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'LTLoginPageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, LTLoginPageModel) {
	    $scope.formdata = LTLoginPageModel.formdata;
	    if(localStorage.getItem("remember")){
	    	$scope.remember = true;
	    }else{
	    	$scope.remember = false;
	    }	   
	    $scope.autocompleteOption = function(remember){
	    	if(remember){
	    		return "on";
	    	}else{
	    		return "off";
	    	}
	    } 
	    
	    $scope.requestAccount = function() {
	    	$state.go('ltlogin.requestaccount');
	    }
	    $scope.forgotPassword = function() {
	    	$state.go('ltlogin.forgotpassword.sendlink');
	    }
	    
	    $scope.login = function() {
		$scope.partnerId = "phoenix"; // should be phoenix eventually.
                $http({
                    url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId, //phoenix
                    data: $scope.formdata,
                    method: 'POST',
                }).success(function(data, status, headers, config){
			    	if($scope.remember == true){
	                    $cookies.org_phoenixbioinformatics_ui_credentialId = data["credentialId"]; //for user googlestaff it's Credential.partyId and it's 42
	                    $cookies.org_phoenixbioinformatics_ui_secretKey = data["secretKey"];
	                    $cookies.org_phoenixbioinformatics_ui_token = data["token"];
			    		localStorage.setItem("remember", true);
			    	}else{
			    		$window.sessionStorage.org_phoenixbioinformatics_ui_credentialId = data["credentialId"]; //for user googlestaff it's Credential.partyId and it's 42
			    		$window.sessionStorage.org_phoenixbioinformatics_ui_secretKey = data["secretKey"];
			    		$window.sessionStorage.org_phoenixbioinformatics_ui_token = data["token"];
			    		$cookies.username = data["username"];
			    		localStorage.removeItem("remember");
			    	}
			    	if($cookies.org_phoenixbioinformatics_ui_credentialId!=null){
						$scope.credentialId = $cookies.org_phoenixbioinformatics_ui_credentialId;
					}else if($window.sessionStorage.org_phoenixbioinformatics_ui_credentialId!=null){
						$scope.credentialId = $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId;
					}
					if($cookies.org_phoenixbioinformatics_ui_secretKey!=null){
						$scope.secretKey = $cookies.org_phoenixbioinformatics_ui_secretKey;
					}else if($window.sessionStorage.org_phoenixbioinformatics_ui_secretKey!=null){
						$scope.secretKey = $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey;
					}
					if($cookies.org_phoenixbioinformatics_ui_token!=null){
						$scope.token = $cookies.org_phoenixbioinformatics_ui_token;
					}else if($window.sessionStorage.org_phoenixbioinformatics_ui_token!=null){
						$scope.token = $window.sessionStorage.org_phoenixbioinformatics_ui_token;
					}
//					$cookies.partyInfo={};
				    $http({
						url: $scope.apiUri+'/parties/?partyId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
						method: 'GET',
						headers: {'Authorization':'JWT '+$scope.token},
					    }).success(function(data, status, headers, config){
					    	$scope.partyInfo = data[0];
							$scope.role = $scope.partyInfo['partyType'];
							if($scope.role == "staff"){
								$state.go("role.phoenix.consortium");
							}else if($scope.role == "consortium"){
								$state.go("role.consortium.institution",{consortiumId: $scope.partyInfo.partyId});
							}else if($scope.role == "organization"){
								$state.go("role.institution.iprange", {institutionId: $scope.partyInfo.partyId});
							}else{
								alert("Cannot recognize account type");
								$scope.logout();
							}
//					    	$cookies.partyInfo.partyId = data[0].partyId;
//					    	$cookies.partyInfo.partyType = data[0].partyType;
//					    	$cookies.partyInfo.display = data[0].display;
//					    	$cookies.partyInfo.name = data[0].name;
//					    	$cookies.partyInfo.country = data[0].country;
//					    	$cookies.partyInfo.consortiums = data[0].consortiums;
					    }).error(function() {});
//					    $http({
//						url: $scope.apiUri+'/credentials/?partyId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
//						method: 'GET'
//					    }).success(function(data, status, headers, config){
//					    	$cookies.partyInfo.username = data[0].username;
//					    	$cookies.partyInfo.email = data[0].email;
//					    	$cookies.partyInfo.institution = data[0].institution;
//					    	$cookies.partyInfo.partnerId = data[0].partnerId;
//					    	$cookies.partyInfo.userIdentifier = data[0].userIdentifier;
//					    }).error(function() {});
//				    $state.go('role');
                }).error(function(data, status, headers, config){
                    alert('Login failed');
                });
	    }
	    
	}
]);
