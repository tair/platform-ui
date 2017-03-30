/**
 * SessionLogs Controller
 */

angular.module('platform-ui.contentaccess.apidoc.sessionlogs').controller(
	/* Name */
	'SessionLogsController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'SessionLogsModel',
	    
	    /* Controller Definition */
	    function ($scope, $state, SessionLogsModel) {
		init();
		function init() {
		    $scope.currentTab = SessionLogsModel.currentTab;
		    $scope.tabs = SessionLogsModel.tabs;
		    $scope.templates = SessionLogsModel.templates;
		}
	    }
	]
);
