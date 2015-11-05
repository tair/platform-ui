/**
 * Login Controller
 */

angular.module('platform-ui.contentaccess.login').controller(
	/* Name */
	'LoginController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'LoginModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, LoginModel) {
		init();

	    var getPartnerUriFromRedirect = function(){
	    	$scope.formdata.emailsent = false;
		arr = $scope.redirectNoEncode.split("/");
		return arr[0]+"//"+arr[2];
	    }
	    var callProxy = function(data){
	    	$scope.formdata.emailsent = false;
		$http({
		    url: getPartnerUriFromRedirect(),
		    data: {
			action:"setCookies",
			credentialId:data["credentialId"],
			secretKey:data["secretKey"]
		    },
		    method: 'POST',
		}).success(function(data, status){
		    $scope.tabPage = '2';
		}).error(function(data, status){
		    alert("cookies error, data " + data + ", status " + status);
		});
	    }
	    
		$scope.login = function() {
			$scope.formdata.emailsent = false;
			$http({
				url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId, //partnerId is tair
				data: $scope.formdata,
				method: 'POST',
			}).success(function(data, status, headers, config){
				$cookies.credentialId = data["credentialId"];//for user andreydemo credentialId is set to Credential.partyId=31300
				$cookies.secretKey = data["secretKey"];
			    	callProxy(data);
				$state.go("login.success");
				//alert('Login successful: '+$cookies.secretKey);
			}).error(function(data, status, headers, config){
				alert('Login failed'+'\ndata: '+data+' status: '+status);
			});
		};
		
		$scope.sent = function(){
			return $scope.formdata.emailsent;
		}
		//vet PW-123
	    $scope.resetpwd = function() {
	    	$scope.formdata.emailsent = false;
	    	if ($scope.formdata.user === null) {
	    		alert("username is required");
	    		return;
	    	}
 	    	$http({
	            	url:$scope.apiUri+'/credentials/resetPwd/?user='+$scope.formdata.user+'&partnerId='+$scope.partnerId,
	   	            method:'PUT',
	            	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            }).success(function(data, status, headers, config){
	            	console.log('status',status);
	                console.log('data',data);
	                $scope.formdata.emailsent = true;
	                $scope.formdata.email=data["useremail"];
	            }).error(function(data, status, headers, config){
	            	alert('Error. Password not updated');
	            	$scope.formdata.emailsent = false;
	            	console.log('status',status);
	                console.log('data',data);
	            });
	    }
        
		function init() {
			Title.setTitle(LoginModel.title);
			$scope.formdata = LoginModel.formdata;
			$scope.formdata.emailsent = false;
			$scope.partnerId = $location.search()['partnerId'];
			$scope.redirect = $scope.getRedirect();
		    $scope.redirectNoEncode = $scope.getRedirectNoEncode();
			$http({
				url: $scope.apiUri+'/partners/descriptions/?partnerId='+$scope.partnerId+'&includeText=True',
				method:'GET',
			}).success(function(data, status, headers, config) {
				$scope.licenses=data;
			}).error(function(data, status, headers, config){
				alert('There was an error retrieving partner license information. Please check if the information supplied is correct');
			});
			$http({
				url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
				method:'GET',
			}).success(function(data, status, headers, config){
				$scope.partner = data[0];
			}).error(function(data, status, headers, config){
				alert('There was an error retrieving the partner object. Please check if the information supplied is correct');
			});
			$scope.license = 'def';
			$scope.tabPage = '1';
		}
	}
]);
