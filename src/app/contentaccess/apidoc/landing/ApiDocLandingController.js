/**
 * Landing Controller
 */

angular.module('platform-ui.contentaccess.apidoc.landing').controller(
/* Name */
'ApiDocLandingController',

/* Dependencies */
[ '$http', '$scope', '$location', '$state', 'Title', 'ApiDocLandingModel',

/* Controller Definition */
function($http, $scope, $location, $state, Title, LandingModel) {
	$scope.next = function() {
		if ($scope.api == "def") {
			alert("Please select an API.");
			return;
		}
		// $scope.switchTab($scope.api);
		if ($scope.api == "partners") {
			$state.go("apidoc.partners.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "parties") {
			$state.go("apidoc.parties.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "credentials") {
			$state.go("apidoc.credentials.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "subscriptions") {
			$state.go("apidoc.subscriptions.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "meters") {
			$state.go("apidoc.meters.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "authorizations") {
			$state.go("apidoc.authorizations.doc", {});
			console.log($state);
			return;
		}
		if ($scope.api == "sessionlogs") {
			$state.go("apidoc.sessionlogs.doc", {});
			console.log($state);
			return;
		}
	}
	$scope.set_api = function(str) {
		$scope.api = str;
	};
	init();

	function init() {
		$scope.apis = LandingModel.apis;
		$scope.api = LandingModel.api;
	}
} ])
