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
	'$location',
	'Title',
	'LoginModel',

	/* Controller Definition */
	function ($scope, $http, $location, Title, LoginModel) {
		init();

		$scope.login = function() {
			$http({
				url: $scope.apiUri+'/users/login/?partnerId='+$scope.partnerId, 
				data: $scope.formdata,
				method: 'POST',
			}).success(function(data, status, headers, config){
				$scope.tabPage = '2';
				//alert('Login successful: '+$cookies.secret_key);
			}).error(function(data, status, headers, config){
				alert('Login failed');
			});
		};

		function init() {
			Title.setTitle(LoginModel.title);
			$scope.formdata = LoginModel.formdata;
			$scope.partnerId = $location.search()['partnerId'];
			$scope.redirect = $location.search()['redirect'];
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
