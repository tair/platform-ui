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
        	
	    	//https://demoapi.arabidopsis.org/credentials/?username=andr5
	    	 //put_data = {};
	    	
	    	 $http({
	            	url:$scope.apiUri+'/credentials/?username='+$scope.formdata.user+'&partnerId='+$scope.partnerId,
	            	//headers: {'Content-Type': 'application/json'},
//	            	transformRequest: function(obj) {
//	                    var str = [];
//	                    for(var p in obj)
//	                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//	                    return str.join("&");
//	                },
	                //data: {username: $scope.userName, password: $scope.password},
	                data: {'password':'2'},
	            	//data: {'password':'2'},
	            	method:'PUT',
	            	//$httpParamSerializer and $httpParamSerializerJQLike
	            	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            }).success(function(data, status, headers, config){
	            	console.log('status',status);
	                console.log('data',data);
	                console.log('headers',header);
	            	//send email via credentials/forgot api
	                $http({
	                	url:$scope.apiUri+'/credentials/forgot?partnerId='+$scope.partnerId,
	                	data:{'user':$scope.formdata.user},
	                	method:'POST',
	                }).success(function(data, status, headers, config){
	                	//alert(data+":"+response+":"+data.response+":"+response.data);
	                	$scope.formdata.emailsent = true;
	                }).error(function(data, status, headers, config){
	                	alert('Error. Email was not sent.');
	                	$scope.formdata.emailsent = false;
	                });
	            }).error(function(data, status, headers, config){
	            	alert('Error. Password not updated');
	            	$scope.formdata.emailsent = false;
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
