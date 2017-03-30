/**
 * Subscriptions Controller
 */

angular.module('platform-ui.contentaccess.apidoc.subscriptions').controller(
	/* Name */
	'SubscriptionsController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'SubscriptionsModel',
	    
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
