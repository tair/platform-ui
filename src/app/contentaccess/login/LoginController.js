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
			partyId:data["partyId"],
			secret_key:data["secret_key"]
		    },
		    method: 'POST',
		}).success(function(data, status){
		    $scope.tabPage = '2';
		}).error(function(data, status){
		    alert("cookies error");
		});
	    }
	    
		$scope.login = function() {
			$scope.formdata.emailsent = false;
			$http({
				url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId, 
				data: $scope.formdata,
				method: 'POST',
			}).success(function(data, status, headers, config){
				$cookies.partyId = data["partyId"];
				$cookies.secret_key = data["secret_key"];
			    	callProxy(data);
				$state.go("login.success");
				//alert('Login successful: '+$cookies.secret_key);
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
	    	//just a test of getting email address by username via api
//	    	 $http({
//	    		 	//get email by username https://demoapi.arabidopsis.org//credentials/?username=techteam
//	                url:$scope.apiUri+'/credentials/?username='+$scope.formdata.user,
//	                method:'GET'
//	            }).success(function(data, status, headers, config) {
//	            	$scope.formdata.email = data[0].email;
//	            	$scope.formdata.emailsent = true;
//	            	alert ("user email is "+$scope.formdata.email);
	            	//send email via credentials/forgot api
	                $http({
	                	url:$scope.apiUri+'/credentials/forgot?partnerId='+$scope.partnerId,
	                	data:{'user':$scope.formdata.user},
	                	method:'POST',
	                }).then(function(response) {
	                //success(function(data, status, headers, config) {
	                	alert(response);
	                	$scope.formdata.emailsent = true;
	                },
	                function(response) {
	                //error(function(data, status, headers, config) {
	                	alert('Error. Email was not sent. '+ response);
	                	$scope.formdata.emailsent = false;
	                });
	            	
	            	
//	            }).error(function() {
//	            	
//	            	$scope.formdata.emailsent = false;
//	            	alert('Error. Email was not sent.');
//	            	
//	            });
	    	 
	    	 
//	         $scope.send = function() {
//	                $http({
//	                    url:$scope.apiUri+'/subscriptions/commercials/',
//	                    data:$scope.formdata,
//	                    method:'POST',
//	                }).success(function(data, status, headers, config) {
//	                }).error(function(data, status, headers, config) {
//	                });
//	                $scope.next("thankyou");
//	            }
//	            
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
