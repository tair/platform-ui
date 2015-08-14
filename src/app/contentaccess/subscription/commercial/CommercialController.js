/**
 * Commercial Controller
 */

angular.module('platform-ui.contentaccess.subscription.commercial').controller(
	/* Name */
	'CommercialController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	    '$scope',
	    '$state',
	    'CommercialModel',
	    
	    /* Controller Definition */
	    function ($http, $cookies, $scope, $state, CommercialModel) {
		$scope.next = function(nextTab) {
                    //$scope.currentTab = nextTab;
		    if (nextTab == "thankyou") {
			$state.go("subscription.commercial.thankyou");
			return;
		    }
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
