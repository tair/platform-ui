/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.login').controller(
	/* Name */
	'LTLoginController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'LTLoginModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, LTLoginModel) {
	    $scope.formdata = LTLoginModel.formdata;
	    $scope.requestAccount = function() {
		alert("requesting account NYI");
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
