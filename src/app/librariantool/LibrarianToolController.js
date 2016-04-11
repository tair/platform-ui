/**
 * LibrarianTool Controller
 */

angular.module('platform-ui.librariantool').controller(
	/* Name */
	'LibrarianToolController',

	/* Dependencies */
	[
	'$scope',
	'Title',
	'CurrentTab',
	'LibrarianToolModel',

	/* Controller Definition */
	function ($scope, Title, CurrentTab, LibrarianToolModel) {
		$scope.setRole = function(role){
			$scope.role = role;
		}
	}
]);
