/**
 * Institution Controller
 */

angular.module('platform-ui.contentaccess.subscription.institution').controller(
	/* Name */
	'InstitutionController',

	/* Dependencies */
	[
	    '$scope',
	    '$state',
	    'InstitutionModel',
	    
	    /* Controller Definition */
	    function ($scope, $state, InstitutionModel) {
		$scope.next = function(nextTab) {
                    //$scope.currentTab = nextTab;
		  if (nextTab == "thankyou") {
			$state.go("subscription.institution.thankyou");
			return;
		  }
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
