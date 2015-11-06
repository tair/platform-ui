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

	    $scope.editSubscription = function() {
	    var formatedEndDate = $scope.setEndDate.split("/")[2]+'-'+
	    $scope.setEndDate.split("/")[0]+'-'+
	    $scope.setEndDate.split("/")[1]+' '+
	    '12:00:00.0';
		postData = {
                       "endDate":formatedEndDate,
                };
                $http({
                        url: $scope.apiUri+'/subscriptions/edit/'+'?subscriptionId='+$scope.subscriptionId,
                        method: 'PUT',
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
		$scope.subscriptionId = $location.search()['subscriptionId'];
		$http({
			url: $scope.apiUri+'/partners?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		
		$http({
			url: $scope.apiUri+'/subscriptions/?subscriptionId='+$scope.subscriptionId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.subscription = data;
		}).error(function() {
			alert("Cannot get subscription information");
		})
		
	    }
	}
]);
