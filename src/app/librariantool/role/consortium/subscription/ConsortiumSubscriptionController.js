/**
 * ConsortiumSubscription Controller
 */

angular.module('platform-ui.librariantool.role.consortium.subscription').controller(
	/* Name */
	'ConsortiumSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumSubscriptionModel) {
	    init();
        
            function init() {
                console.log($state);
//                $scope.setTitle(ConsortiumSubscriptionModel.title);
                $scope.partners = ConsortiumSubscriptionModel.partners;
                $scope.activeSubscriptions = ConsortiumSubscriptionModel.activeSubscriptions;
                $scope.uiparams = ConsortiumSubscriptionModel.uiparams;
                $http({
                        url: $scope.apiUri+'/partners/',
                        method: 'GET',
                }).success(function(data, status, headers, config) {
                        $scope.partners = data;
                }).error(function() {
                        alert("Cannot get partner information");
                });
                $http({
                        url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$cookies.credentialId+'/',
                        method: 'GET',
                }).success(function(data, status, headers, config) {
                        $scope.activeSubscriptions = data;
                }).error(function() {
                        alert("Cannot get active subscription information");
                });
                $state.go('role.consortium.subscription.list');
            }
	}
]);
