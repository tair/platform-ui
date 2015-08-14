/**
 * Term Controller
 */

angular.module('platform-ui.contentaccess.subscription.individual.term').controller(
    /* Name */
    'TermController',
    
    /* Dependencies */
    [
	'$http',
	'$scope',
	'$rootScope',
	'TermModel',
	
	/* Controller Definition */
	function ($http, $scope, $rootScope, TermModel) {
	    init();
	    
	    $scope.reset = function() {
                $scope.info.numOfSubscribers = 1;
                $scope.userbool = false;
                $scope.termsbool = false;
	    };
	    
	    $scope.validate = function() {
		return (
			$scope.selectedSubscription.subscriptionTermId != null
			&&
			$scope.info.numOfSubscribers > 0
			&&
			$scope.userbool == true 
			&&
			$scope.termsbool == true
		);
	    };

	    $scope.validateAndSubmit = function() {
		$scope.errors = null;
		if ($scope.selectedSubscription.subscriptionTermId == null) {
			$scope.errors = 'Please select a subscription term.';
			return false;
		}
		if ($scope.info.numOfSubscribers <= 0) {
			$scope.errors = 'Number of licenses must be a poitive integer.';
			return false;
		}
		if ($scope.userbool == false) {
			$scope.errors = 'Please confirm that you are an academic individual.';
			return false;
		}
		if ($scope.termsbool == false) {
			$scope.errors = 'Please accept the terms of use.';
			return false;
		}
		return true;
	    };
	    
	    function init() {
                $scope.subscriptions = TermModel.subscriptions;
		$scope.userbool = TermModel.userbool;
		$scope.termsbool = TermModel.termsbool;
                $http({
		    url:$scope.apiUri+'/partners/terms/?partnerId='+$scope.partnerId,
		    method:'GET',
                }).success(function(data, status, headers, config) {
		    $scope.subscriptions = data;
                }).error(function(data, status, headers, config) {
                });
	    };
	}
    ]);
