/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.adminportal.role.consortium.subscription.list').controller(
	/* Name */
	'ConsortiumSubscriptionListController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'ConsortiumSubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, ConsortiumSubscriptionListModel) {
	    init();

	    $scope.getExpDate = function(id) {
		if (id in $scope.activeSubscriptions) {
			return $filter('date')($scope.activeSubscriptions[id].endDate, 'MMM dd yyyy');
			//return $scope.activeSubscriptions[id].endDate;
		}
		return "Unlicensed";
	    };

	    $scope.licenseButton = function(id) {
	    if ($scope.role == 'staff'){
	    	return "Edit";
	    }else if (id in $scope.activeSubscriptions) {
			return "Request renewal";
		}else{
			return "Request quote";
		}
	    };

	    $scope.licenseAction = function(id) {
	    if ($scope.role == 'staff'){
	    	return;
	    }
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
		$scope.uiparams = ConsortiumSubscriptionListModel.uiparams;
	    }
	}
]);

//myapp.filter('dateFormat', function($filter)
//		{
//		 return function(input)
//		 {
//		  if(input == null){ return ""; } 
//		 
//		  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
//		 
//		  return _date.toUpperCase();
//
//		 };
//		});
//