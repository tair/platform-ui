/**
 * Login Controller
 */

angular.module('platform-ui.login').controller(
	/* Name */
	'LoginController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'Title',
	'LoginModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, Title, LoginModel) {
		init();

	    var getPartnerUriFromRedirect = function(){
		arr = $scope.redirectNoEncode.split("/");
		return arr[0]+"//"+arr[2];
	    }
	    var callProxy = function(data){
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
		});
	    }

		$scope.login = function() {
			$http({
				url: $scope.apiUri+'/users/login/?partnerId='+$scope.partnerId, 
				data: $scope.formdata,
				method: 'POST',
			}).success(function(data, status, headers, config){
				$cookies.partyId = data["partyId"];
				$cookies.secret_key = data["secret_key"];
			    	callProxy(data);
				//alert('Login successful: '+$cookies.secret_key);
			}).error(function(data, status, headers, config){
				alert('Login failed');
			});
		};

		function init() {
			Title.setTitle(LoginModel.title);
			$scope.formdata = LoginModel.formdata;
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
