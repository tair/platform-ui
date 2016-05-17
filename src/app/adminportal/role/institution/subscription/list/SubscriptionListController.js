/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.adminportal.role.institution.subscription.list').controller(
	/* Name */
	'SubscriptionListController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'SubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, SubscriptionListModel) {
	    init();

	    $scope.getExpDate = function(id) {
		if (id in $scope.activeSubscriptions) {
			return $scope.activeSubscriptions[id].endDate;
		}
		return "Unlicensed";
	    };

	    $scope.licenseButton = function(p) {
	    if ($scope.role == 'staff'){
	    	return "Edit";
	    }else if (p.partnerId in $scope.activeSubscriptions) {
			return "Request renewal";
		}else{
			return "Request quote";
		}
	    };
	    
	    $scope.licenseAction = function(p) {
	    if ($scope.role == 'staff'){
	    	$state.go('role.institution.subscription.edit', {'partnerId': p.partnerId});
	    }else if (p.partnerId in $scope.activeSubscriptions) {
			//PW-139
			$state.go('role.institution.subscription.renewal', {'partnerId': p.partnerId});
		} else {
			$state.go('role.institution.subscription.request', {'partnerId': p.partnerId});
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
		$scope.uiparams = SubscriptionListModel.uiparams;
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
	    }
	}
]);
