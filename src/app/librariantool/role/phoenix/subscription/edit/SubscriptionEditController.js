/**
 * SubscriptionEdit Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.subscription.edit').controller(
	/* Name */
	'SubscriptionEditController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'SubscriptionEditModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, SubscriptionEditModel) {
	    init();
	    
	    $scope.back = function() {
		$state.go('role.phoenix.subscription.list');
	    };

	    $scope.requestRenewal = function() {
		postData = {
                        "partnerName": $scope.partner.name,
                        "name": $scope.user.name,
                        "email": $scope.user.email,
                        "institution": $scope.user.institution,
                        "comments": $scope.comments,
                };
                $http({
                        url: $scope.apiUri+'/subscriptions/edit/',
                        method: 'POST',
                        data: postData,
                }).success(function(){
                        alert("Edit Successful");
                        $scope.comments = null;
                }).error(function() {
                        alert("Edit Falied");
                });
		return true;
	    };

	    function init() {
    	$(function () {
            $('#datepicker').datepicker();
        });
		$scope.setTitle(SubscriptionEditModel.title);
		$scope.uiparams = SubscriptionEditModel.uiparams;
		$scope.partnerId = $location.search()['partnerId'];
		$http({
			url: $scope.apiUri+'/partners?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
                        url: $scope.apiUri+'/credentials?username='+$cookies.username,
                        method: 'GET',
                }).success(function(data, status, headers, config){
                        $scope.user = data[0];
                }).error(function() {
                        alert("User information failed to retrieve");
                });
	    }
	}
]);
