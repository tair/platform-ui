/**
 * ConsortiumIpRange Controller
 */

angular.module('platform-ui.librariantool.role.consortium.profile').controller(
	/* Name */
	'ConsortiumProfileController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumProfileModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumProfileModel) {
	    $scope.setTitle(ConsortiumProfileModel.title);
	}
]);
