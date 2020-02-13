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
			init();

			$scope.next = function(nextTab) {
	                    //$scope.currentTab = nextTab;
			    if (nextTab == "thankyou") {
				$state.go("subscription.commercial.thankyou");
				return;
			    }
			}

			function init() {
			    $scope.currentTab = CommercialModel.currentTab;
			    $scope.tabs = CommercialModel.tabs;
			    $scope.templates = CommercialModel.templates;
			}
	    }
	]
);
