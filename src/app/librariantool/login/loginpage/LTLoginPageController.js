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
	'$location',
	'$state',
	'Title',
	'LTLoginPageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, LTLoginPageModel) {
	    $scope.formdata = LTLoginPageModel.formdata;
	    if(localStorage.getItem("username")){
	    	$scope.formdata["user"] = localStorage.getItem("username");
	    }
	    if(localStorage.getItem("password")){
	    	$scope.formdata["password"] = localStorage.getItem("password");
	    }
	    if(localStorage.getItem("remember")){
	    	$scope.remember = true;
	    }else{
	    	$scope.remember = false;
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
                    $cookies.credentialId = data["credentialId"]; //for user googlestaff it's Credential.partyId and it's 42
                    $cookies.secretKey = data["secretKey"];
				    $cookies.username = data["username"];
			    	if($scope.remember == true){
			    		localStorage.setItem("username", $scope.formdata["user"]);
			    		localStorage.setItem("password", $scope.formdata["password"]);
			    		localStorage.setItem("remember", true);
			    	}else{
			    		localStorage.removeItem("username");
			    		localStorage.removeItem("password");
			    		localStorage.removeItem("remember");
			    	}
				    $http({
					url: $scope.apiUri+'/parties?partyId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
					method: 'GET'
				    }).success(function(data, status, headers, config){
//				    	select distinct partyType from  demo1.Party
//				    	partyType    |
//				    	-------------|
//				    	user         |
//				    	organization |
//				    	consortium   |
//				    	staff        |
//				    	institution  |
				    	//for googlestaff "partyType" is "organization",
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
