/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.librariantool.role.consortium.subscription.list').controller(
	/* Name */
	'ConsortiumSubscriptionListController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumSubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumSubscriptionListModel) {
	    init();

	    $scope.getExpDate = function(id) {
		if (id in $scope.activeSubscriptions) {
			return $scope.activeSubscriptions[id].endDate;
		}
		return "Unlicensced";
	    };

	    $scope.licenseButton = function(id) {
		if (id in $scope.activeSubscriptions) {
			return "RENEW LICENCSE";
		}
		return "REQUEST LICENCSE";
	    };

	    $scope.licenseAction = function(id) {
		if (id in $scope.activeSubscriptions) {
			$state.go('role.consortium.subscription.renewal', {'partnerId': id});
		} else {
			$state.go('role.consortium.subscription.request', {'partnerId': id});
		}
	    } 

	    $scope.listPartners = function(partners) {
                var ret = [];
                for (var i=0; i<partners.length; i++) {
                    if (partners[i].partnerId!="phoenix") {
                        ret.push(partners[i]);
                    }
                }
                console.log(ret);
                return ret;
            }

	    function init() {
		console.log($state);
		$scope.setTitle(ConsortiumSubscriptionListModel.title);
		$scope.uiparams = ConsortiumSubscriptionListModel.uiparams;
	    }
	}
]);
