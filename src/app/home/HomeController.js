/**
 * Home Controller
 */

angular.module('platform-ui.home').controller(
	/* Name */
	'HomeController',

	/* Dependencies */
	[
	'$scope',
	'Title',
	'HomeModel',

	/* Controller Definition */
	function ($scope, Title, HomeModel) {
		Title.setTitle(HomeModel.title);
	}
]);