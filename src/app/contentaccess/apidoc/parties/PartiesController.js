/**
 * Parties Controller
 */

angular.module('platform-ui.contentaccess.apidoc.parties').controller(
	/* Name */
	'PartiesController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'PartiesModel',
	    
	    /* Controller Definition */
	    function ($scope, $state, PartiesModel) {
		init();
		function init() {
		    $scope.currentTab = PartiesModel.currentTab;
		    $scope.tabs = PartiesModel.tabs;
		    $scope.templates = PartiesModel.templates;
		}
	    }
	]
);
