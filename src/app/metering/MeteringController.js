/**
 * Metering Controller
 */

angular.module('platform-ui.metering').controller(
	/* Name */
	'MeteringController',

	/* Dependencies */
	[
	'$scope',
	'$location',
	'Title',
	'MeteringModel',

	/* Controller Definition */
	function ($scope, $location, Title, MeteringModel) {
		Title.setTitle(MeteringModel.title);
		$scope.partnerId = $location.search()['partnerId'];
		$scope.redirect = $location.search()['redirect'];
	}
]);
