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
		postData = {
                       "endDate":$scope.setEndDate,
                };
                $http({
                        url: $scope.apiUri+'/partners/edit/'+'?partnerId='+$scope.partnerId,
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
		$http({
			url: $scope.apiUri+'/partners?partnerId='+$scope.partnerId,
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partner = data[0];
		}).error(function() {
			alert("Cannot get partner information");
		});
		
	    }
	}
]);
