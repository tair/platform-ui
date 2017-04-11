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
	    function ($scope, $state, SubscriptionsModel) {
		init();
		function init() {
		    $scope.currentTab = SubscriptionsModel.currentTab;
		    $scope.tabs = SubscriptionsModel.tabs;
		    $scope.templates = SubscriptionsModel.templates;
		}
	    }
	]
);
