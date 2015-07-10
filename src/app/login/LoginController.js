/**
 * Login Controller
 */

angular.module('platform-ui.login').controller(
	/* Name */
	'LoginController',

	/* Dependencies */
	[
	'$scope',
	'$cookies',
	'$http',
	'$location',
	'Title',
	'LoginModel',

	/* Controller Definition */
	function ($scope, $cookies, $http, $location, Title, LoginModel) {
		init();

		$scope.login = function() {
			$http({
				url: $scope.resources.login+'?partnerId='+$scope.partnerId, 
				data: $scope.formdata,
				method: 'POST',
				withCredentials: true
			}).success(function(data, status, headers, config){
				$scope.tabPage = '2';
				//alert('Login successful: '+$cookies.secret_key);
			}).error(function(data, status, headers, config){
				alert('Login failed');
			});
		};

		function init() {
			Title.setTitle(LoginModel.title);
			$cookies.apiKey = 'test123';
			$scope.resources = LoginModel.resources;
			$scope.formdata = LoginModel.formdata;
			$scope.partnerId = $location.search()['partnerId'];
			$scope.redirect = $location.search()['redirect'];
			$http({
				url: 'http://azeemapi.steveatgetexp.com/partners/descriptions/?partnerId='+$scope.partnerId+'&includeText=True',
				method:'GET',
				withCredentials:true,
			}).success(function(data, status, headers, config) {
				$scope.licenses=data;
			}).error(function(data, status, headers, config){
				alert('There was an error retrieving partner license information. Please check if the information supplied is correct');
			});
			$http({
				url:'http://azeemapi.steveatgetexp.com/partners/?partnerId='+$scope.partnerId,
				method:'GET',
				withCredentials:true,
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
