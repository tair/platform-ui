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
	'$location',
	'$state',
	'Title',
	'SubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, SubscriptionListModel) {
	    init();

	    $scope.getSubState = function(id) {
	    	var subscriptionState = "";
	    	if (id in $scope.activeSubscriptions) {
	    		subscriptionState = "Active";
	    	}else if (id in $scope.consActiveSubscriptions){
	    		subscriptionState = "Consortium Subscribed";
	    	}else if (!(id in $scope.allSubscriptions)){
	    		subscriptionState = "Unlicensed";
	    	}else{
	    		var startDate = new Date($scope.allSubscriptions[id].startDate);
		    	var endDate = new Date($scope.allSubscriptions[id].endDate);
		    	var today = new Date();
		    	if (today < startDate){
		    		subscriptionState = "Not yet activated";
		    	}else if (today > endDate){
		    		subscriptionState = "Expired";
		    	}
	    	} 
	    	return subscriptionState;
	    }
	    
//	    $scope.getExpDate = function(id) {
//		if (id in $scope.activeSubscriptions) {
//			return $scope.activeSubscriptions[id].endDate;
//		}
//		return "Unlicensed";
//	    };
	    $scope.getStartDate = function(id) {
	    	if (id in $scope.allSubscriptions){
	    	return $scope.allSubscriptions[id].startDate;
	    	}else{
	    		return "N/A";
	    	}
	    }
	    $scope.getEndDate = function(id) {
	    	if (id in $scope.allSubscriptions){
	    	return $scope.allSubscriptions[id].endDate;
	    	}else{
	    		return "N/A";
	    	}
	    }
	    $scope.getLatestStartDate = function(id) {
	    	if (id in $scope.latestSubscriptions){
	    		return $scope.latestSubscriptions[id].startDate;
	    	}else{
	    		return "N/A";
	    	}
	    }
	    $scope.getLatestEndDate = function(id) {
	    	if (id in $scope.latestSubscriptions){
	    		return $scope.latestSubscriptions[id].endDate;
	    	}else{
	    		return "N/A";
	    	}
	    }
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
	    	$state.go('role.institution.subscription.edit', {'partnerId': id});
	    }else if (id in $scope.activeSubscriptions) {
			//PW-139
			$state.go('role.institution.subscription.renewal', {'partnerId': id});
		} else {
			$state.go('role.institution.subscription.request', {'partnerId': id});
		}
	    } 
	
	    $scope.listPartners = function(partners) {
		var ret = [];
		for (var i=0; i<partners.length; i++) {
			partners[i].status = $scope.getSubState(partners[i].partnerId);
	    	partners[i].startDate = $scope.getStartDate(partners[i].partnerId);
	    	partners[i].endDate = $scope.getEndDate(partners[i].partnerId);
	    	partners[i].latestStartDate = $scope.getLatestStartDate(partners[i].partnerId);
	    	partners[i].latestEndDate = $scope.getLatestEndDate(partners[i].partnerId);
	    	if (partners[i].partnerId in $scope.consActiveSubscriptions){
	    		partners[i].consortiumsList = $scope.consActiveSubscriptions[partners[i].partnerId];
	    		partners[i].consortiumSubState = true;
	    	} else {
	    		partners[i].consortiumSubState = false;
	    	}
		    if (partners[i].partnerId!="phoenix") {
			ret.push(partners[i]);
		    }
		}
		// console.log(ret);
		return ret;
	    }
	    $scope.toConsortium = function(consortium){
	    	$state.go('role.consortium.subscription.list', {'consortiumId': consortium.partyId});
	    }
	    function init() {
		// console.log($state);
		$scope.uiparams = SubscriptionListModel.uiparams;
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
	    }
	}
]);
