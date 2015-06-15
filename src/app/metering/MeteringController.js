/**
 * Metering Controller
 */

angular.module('boilerplate.metering').controller(
	/* Name */
	'MeteringController',

	/* Dependencies */
	[
	'$scope',
	'Title',
	'MeteringModel',

	/* Controller Definition */
	function ($scope, Title, MeteringModel) {
		Title.setTitle(MeteringModel.title);
	}
]);
