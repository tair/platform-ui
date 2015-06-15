/**
 * App Controller
 */

angular.module('boilerplate').controller(
	/* Name */
	'BoilerplateController',

	/* Dependencies */
	[
	'$scope',
	'BoilerplateModel',

	/* Controller Definition */
	function ($scope, BoilerplateModel) {
		$scope.title = BoilerplateModel.title;
		$scope.brand = BoilerplateModel.brand;
		$scope.author = BoilerplateModel.author;
		$scope.menu = BoilerplateModel.menu;
	}
]);