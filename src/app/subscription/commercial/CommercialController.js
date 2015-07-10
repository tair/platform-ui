/**
 * Commercial Controller
 */

angular.module('platform-ui.subscription.commercial').controller(
	/* Name */
	'CommercialController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	    '$scope',
	    'CommercialModel',
	    
	    /* Controller Definition */
	    function ($http, $cookies, $scope, CommercialModel) {
		$scope.next = function(nextTab) {
                    $scope.currentTab = nextTab;
		}
		init();
		function init() {
		    $scope.currentTab = CommercialModel.currentTab;
		    $scope.tabs = CommercialModel.tabs;
		    $scope.templates = CommercialModel.templates;
		}
	    }
	]
);
