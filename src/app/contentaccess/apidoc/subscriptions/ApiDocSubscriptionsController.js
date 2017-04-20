/**
 * Subscriptions Controller
 */

angular.module('platform-ui.contentaccess.apidoc.subscriptions').controller(
	/* Name */
	'ApiDocSubscriptionsController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'ApiDocSubscriptionsModel',
	    
	    /* Controller Definition */
	    function ($scope, $state, ApiDocSubscriptionsModel) {
		init();
		function init() {
		    $scope.currentTab = ApiDocSubscriptionsModel.currentTab;
		    $scope.tabs = ApiDocSubscriptionsModel.tabs;
		    $scope.templates = ApiDocSubscriptionsModel.templates;
		}
	    }
	]
);
