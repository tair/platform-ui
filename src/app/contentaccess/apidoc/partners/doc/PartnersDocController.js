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
		$scope.heading = LandingModel.heading;
		$scope.overview = LandingModel.overview;
		$scope.datatypes = LandingModel.datatypes;
		$scope.calls = LandingModel.calls;
	}
} ]);
