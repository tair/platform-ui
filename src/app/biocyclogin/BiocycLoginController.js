/**
 * Biocyc Login Controller
 */

angular.module('platform-ui.biocyclogin').controller(
	/* Name */
	'BiocycLoginController',

	/* Dependencies */
	[
	'$scope',
	'Title',
	'BiocycLoginModel',

	/* Controller Definition */
	function ($scope, Title, BiocycLoginModel) {
		Title.setTitle(BiocycLoginModel.title);
	}
]);