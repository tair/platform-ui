/**
 * Login Page Controller
 */

angular.module('platform-ui.librariantool.login.page').controller(
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
		$scope.partyInfo = {};
                $http({
                    url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId, //phoenix
                    data: $scope.formdata,
                    method: 'POST',
                }).success(function(data, status, headers, config){
			    	if($scope.remember == true){
	                    $cookies.org_phoenixbioinformatics_ui_credentialId = data["credentialId"]; //for user googlestaff it's Credential.partyId and it's 42
	                    $cookies.org_phoenixbioinformatics_ui_secretKey = data["secretKey"];
//					    $cookies.username = data["username"];
			    		localStorage.setItem("remember", true);
			    	}else{
			    		$window.sessionStorage.org_phoenixbioinformatics_ui_credentialId = data["credentialId"]; //for user googlestaff it's Credential.partyId and it's 42
			    		$window.sessionStorage.org_phoenixbioinformatics_ui_secretKey = data["secretKey"];
//			    		$window.sessionStorage.username = data["username"];
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
				    $state.go('role');
                }).error(function(data, status, headers, config){
                    alert('Login failed');
                });
	    }
	    
	}
]);
