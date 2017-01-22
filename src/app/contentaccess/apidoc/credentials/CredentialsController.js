/**
 * Credentials Controller
 */

angular.module('platform-ui.contentaccess.apidoc.credentials').controller(
	/* Name */
	'CredentialsController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'CredentialsModel',
	    
	    /* Controller Definition */
	    function ($scope, $state, CredentialsModel) {
		init();
		function init() {
		    $scope.currentTab = CredentialsModel.currentTab;
		    $scope.tabs = CredentialsModel.tabs;
		    $scope.templates = CredentialsModel.templates;
		}
	    }
	]
);
