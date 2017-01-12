/**
 * Partners Doc Controller
 */

angular.module('platform-ui.contentaccess.apidoc.partners.doc').controller(
/* Name */
'PartnersDocController',

/* Dependencies */
[ '$http', '$scope', '$stateParams', 'PartnersDocModel',

/* Controller Definition */
function($http, $scope, $stateParams, PartnersDocModel) {
	init();

	function init() {
		$scope.heading = PartnersDocModel.heading;
		$scope.overview = PartnersDocModel.overview;
		$scope.datatypes = PartnersDocModel.datatypes;
		$scope.calls = PartnersDocModel.calls;
	}
} ]);
