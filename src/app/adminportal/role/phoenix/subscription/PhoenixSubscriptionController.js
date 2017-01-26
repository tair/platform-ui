/**
 * PhoenixSubscriptionController
 */

angular.module('platform-ui.adminportal.role.phoenix.subscription').controller(
	/* Name */
	'PhoenixSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'PhoenixSubscriptionModel',
	'FileSaver',
	'Blob',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, PhoenixProfileModel, FileSaver, Blob) {
	    init();
	    
	    $scope.downloadRequest = function(){
	    		//$window.location.href = $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey);
	    	$http({
				url: $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
				method: 'GET',
				headers: {'Authorization': 'JWT '+$scope.token},
			    }).success(function(data, status, headers, config){
			    	//http://alferov.github.io/angular-file-saver/
			    	var data = new Blob([data], { type: 'text/plain;charset=utf-8' });
			        FileSaver.saveAs(data, 'report.txt');
			    	/*If you need to save really large files bigger then the blob's size limitation or don't 
			    	have enough RAM, then have a look at the more advanced StreamSaver.js.*/
			    	console.log('downloadRequest success.');
			    }).error(function() {
			    	console.log('downloadRequest error.');
			    });
	    }
	    $scope.downloadLink = $scope.apiUri+'/subscriptions/subscriptionrequest/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey);
	    	function init() {
	    		$scope.setCurrentTab(PhoenixProfileModel.currentTab);
//				if(!$scope.credentialId || !$scope.secretKey){
//					$state.go('ltlogin');
//				}
                }
	}
]);
