/**
 * Login Controller
 */

angular.module('platform-ui.contentaccess.login').controller(
	/* Name */
	'LoginController',

	/* Dependencies */
	[
	'$scope',
	'$window',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'LoginModel',

	/* Controller Definition */
	function ($scope, $window, $http, $cookies, $location, $state, Title, LoginModel) {
		init();

	    var getPartnerUriFromRedirect = function(){
	    //$scope.formdata.emailsent = false;
		arr = $scope.redirectNoEncode.split("/");
		return arr[0]+"//"+arr[2];
	    }
	    var callProxy = function(data){
	    //$scope.formdata.emailsent = false;
		$http({
		    url: getPartnerUriFromRedirect(),
		    data: {
			action:"setCookies",
			credentialId:data["credentialId"],
			secretKey:data["secretKey"]
		    },
		    method: 'POST',
		}).success(function(data, status){
            $window.location.href = $scope.redirectNoEncode;
		    //$scope.tabPage = '2';
		}).error(function(data, status){
		    alert("cookies error, data " + data + ", status " + status);
		});
	    }
	    
		$scope.login = function() {
			$http({
				url: $scope.apiUri+'/credentials/login/?partnerId='+$scope.partnerId, //partnerId is tair
				data: $scope.formdata,
				method: 'POST',
			}).success(function(data, status, headers, config){
				$cookies.credentialId = data["credentialId"];//for user andreydemo credentialId is set to Credential.partyId=31300
				$cookies.secretKey = data["secretKey"];
			    callProxy(data);
				//$state.go("login.success");
				//alert('Login successful: '+$cookies.secretKey);
			}).error(function(data, status, headers, config){
				alert('Login failed'+'\ndata: '+data+' status: '+status);
			});
		};
		
//		$scope.sent = function(){
//			return $scope.formdata.emailsent;
//		}
		//vet PW-123
		
		maskEmail = function(originalEmail){
			var beforeAt='',middle='',asterisk='',afterAt='',maskedEmail='';
			//console.log('original email',originalEmail);
	    	beforeAt = originalEmail.split("@")[0];
	    	afterAt = originalEmail.split("@")[1];
	    	//console.log('   beforeAt',beforeAt,'; beforeAtlength',beforeAt.length);
	    	
	    	//don't mask
//	    	if (beforeAt.length<=2){
//	    		return originalEmail;
//	    	}
	    	//a@yahoo.com => *@yahoo.com
	    	if (beforeAt.length==1){
	    		return "*@"+afterAt;
	    	}
	    	//ab@yahoo.com => a*@yahoo.com
	    	if (beforeAt.length==2){
	    		return beforeAt[0]+"*@"+afterAt;
	    	}
	    	//if we don't need to asteriks exactly each of n-2 chars between first and last char (where n is a lenth), 
	    	//then we may return first***last@afterAt
//	    	console.log('beforeAt[beforeAt.length-1](last char)='+beforeAt[beforeAt.length-1]);
//	    	return beforeAt[0]+"***"+beforeAt[beforeAt.length-1]+"@"+afterAt;

	    	//if we need to astriks exactly each char between first and last 
            middle=beforeAt.substring(1,beforeAt.length-1);
            //console.log('   middle',middle);
            
            for(i=middle.length;i>0;i--)
              asterisk+='*';
            
            maskedBeforeAt = beforeAt.replace(middle, asterisk);
            //console.log('   maskedBeforeAt',maskedBeforeAt);

            maskedEmail = maskedBeforeAt+"@"+afterAt;
            //console.log("   maskedEmail",maskedEmail);
            
            return maskedEmail;	
		};
		
	    $scope.resetpwd = function() {
	    	//email masking tests. to remove later
		    console.log('a@arabi.com=>'+maskEmail("a@arabi.com"));
		    console.log('ab@arabi.com=>'+maskEmail("ab@arabi.com"));
		    console.log('abc@arabi.com=>'+maskEmail("abc@arabi.com"));
		    console.log('abcd@arabi.com=>'+maskEmail("abcd@arabi.com"));
	    	if ($scope.formdata.user === null || $scope.formdata.user == 'undefined') {
	    		bootbox.alert("To reset password username is required");//http://bootboxjs.com/
	    		return;
	    	}
	    	//$scope.formdata.emailsent = true;
 	    	$http({
	            	url:$scope.apiUri+'/credentials/resetPwd/?user='+$scope.formdata.user+'&partnerId='+$scope.partnerId,
	   	            method:'PUT',
	            	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            }).success(function(data, status, headers, config){
	            	console.log('status',status);
	                console.log('data',data);
	                //$scope.formdata.emailsent = true;
	                $scope.formdata.email=data["useremail"]
	                maskedEmail = maskEmail($scope.formdata.email);
	                bootbox.alert("A temporary password has be emailed to your address "+maskedEmail);
	            }).error(function(data, status, headers, config){
	            	bootbox.alert('Error. Password not updated');
	            	//$scope.formdata.emailsent = false;
	            	console.log('status',status);
	                console.log('data',data);
	            });
	    }
        
		function init() {
			Title.setTitle(LoginModel.title);
			$scope.formdata = LoginModel.formdata;
			//$scope.formdata.emailsent = false;
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
