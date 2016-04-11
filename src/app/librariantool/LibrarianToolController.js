/**
 * LibrarianTool Controller
 */

angular.module('platform-ui.librariantool').controller(
	/* Name */
	'LibrarianToolController',

	/* Dependencies */
	[
	'$scope',
	'LibrarianToolModel',

	/* Controller Definition */
	function ($scope, LibrarianToolModel) {
		$scope.setRole = function(role){
			$scope.role = role;
		}
	}
]);
