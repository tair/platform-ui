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
	    
	    //assign all states instead of get state by partnerId
	    function preprocessPartners(partners){
	    	for (subscription in $scope.allSubscriptions){
	    		var partnerId = subscription["partnerId"];
	    		var startDate = subscription["startDate"];
	    		var endDate = subscription["endDate"];
	    		
	    		var startDate_toDate = new Date(startDate);
		    	var endDate_toDate = new Date(endDate);
		    	var today = new Date();
		    	
		    	partners[partnerId]["status"] = "Unlicensed";
		    	partners[partnerId]["startDate"] = "N/A";
		    	partners[partnerId]["endDate"] = "N/A";
		    	
		    	if (today < startDate_toDate){
		    		partners[partnerId]["status"] = "Not yet activated";
		    	}else if (today > endDate_toDate){
		    		partners[partnerId]["status"] = "Expired";
		    	}else{
		    		partners[partnerId]["status"] = "Active";
		    	}
	    		
	    		partners[partnerId]["startDate"] = startDate;
	    		partners[partnerId]["endDate"] = endDate;
	    		return partners;
	    	}
    		
	    	for (partner in partners) {
				
		    	if (partner.partnerId in $scope.consActiveSubscriptions){
		    		if(partner["status"] != "Active"){
		    			partner["status"] = "Consortium Subscribed";
		    		}
		    		partner.consortiumSubState = true;
		    	}else{
		    		partner.consortiumSubState = false;
		    	}
			}
//	    	for (var i=0; i<$scope.partners.length; i++) {
//	    		if ($scope.partners[i]["partnerId"] in $scope.consActiveSubscriptions){
//		    		if($scope.partners[i]["status"] != "Active"){
//		    			$scope.partners[i]["status"] = "Consortium Subscribed";
//		    		}
//		    		$scope.partners[i]["consortiumSubState"] = true;
//		    	}else{
//		    		$scope.partners[i]["consortiumSubState"] = false;
//		    	}
//	    	}
	    };

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
	    	partners = preprocessPartners(partners);
			var ret = [];
			for (var i=0; i<partners.length; i++) {
				//partners[i].status = $scope.getSubState(partners[i].partnerId);
		    	//partners[i].startDate = $scope.getStartDate(partners[i].partnerId);
		    	//partners[i].endDate = $scope.getEndDate(partners[i].partnerId);
				
	//	    	if (partners[i].partnerId in $scope.consActiveSubscriptions){
	//	    		if(partners[i]["status"] != "Active"){
	//	    			partners[i]["status"] = "Consortium Subscribed";
	//	    		}
	//	    		partners[i].consortiumsStr = "Consortiums:";
	//	    	} else {
	//	    		partners[i].consortiumsStr = "No Consortium Subscribed.";
	//	    	}
			    if (partners[i].partnerId!="phoenix") {
				ret.push(partners[i]);
			    }
			}
			console.log(ret);
			return ret;
	    }
	    $scope.toConsortium = function(consortium){
	    	$state.go('role.consortium.subscription.list', {'consortiumId': consortium.partyId});
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
