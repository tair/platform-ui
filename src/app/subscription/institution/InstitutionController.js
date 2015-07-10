/**
 * Institution Controller
 */

angular.module('platform-ui.subscription.institution').controller(
	/* Name */
	'InstitutionController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	    '$scope',
	    'InstitutionModel',
	    
	    /* Controller Definition */
	    function ($http, $cookies, $scope, InstitutionModel) {
		$scope.next = function(nextTab) {
                    $scope.currentTab = nextTab;
		}
		init();
		function init() {
		    $scope.currentTab = InstitutionModel.currentTab;
		    $scope.tabs = InstitutionModel.tabs;
		    $scope.templates = InstitutionModel.templates;
		}
	    }
	]
);
