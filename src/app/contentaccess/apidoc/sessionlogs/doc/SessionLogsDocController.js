/**
 * SessionLogs Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.sessionlogs.doc').controller(
/* Name */
'SessionLogsDocController',

/* Dependencies */
[ '$http', '$scope', '$stateParams', 'SessionLogsDocModel',

/* Controller Definition */
function($http, $scope, $stateParams, SessionLogsDocModel) {
	init();

	function init() {
		$scope.heading = SessionLogsDocModel.heading;
		$scope.overview = SessionLogsDocModel.overview;
		$scope.datatypes = SessionLogsDocModel.datatypes;
		$scope.calls = SessionLogsDocModel.calls;
	}
} ]);
