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
	    $scope.setTitle(ConsortiumSubscriptionModel.title);
	}
]);
