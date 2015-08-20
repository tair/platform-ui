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
	'LibrarianToolModel',

	/* Controller Definition */
	function ($scope, Title, ContentAccessModel) {
	    Title.setTitle(ContentAccessModel.title);
	    $scope.title = ContentAccessModel.title;
	}
]);
