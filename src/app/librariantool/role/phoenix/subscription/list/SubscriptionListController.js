/**
 * SubscriptionList Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.subscription.list').controller(
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
	'Dateformat',
	'SubscriptionListModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, Dateformat, SubscriptionListModel) {
	    init();

	    $scope.getExpDate = function(id) {
//		if (id in $scope.activeSubscriptions) {
//			return $scope.activeSubscriptions[id].endDate;
//		}
		return "N/A";//return N/A because expiration date in a partner only apply to single party
	    };

	    $scope.licenseButton = function(id) {
	    if(id == 'subscription'){
	    	return "Edit";
	    }else{
	    	return "N/A";//return N/A because set expiration date only apply to single subscription
	    }
//		if (id in $scope.activeSubscriptions) {
//			return "Request renewal";
//		}
//		return "Request quote";
	    };

	    $scope.licenseAction = function(id) {
	    	$state.go('role.phoenix.subscription.edit', {'partnerId': id});
//		if (id in $scope.activeSubscriptions) {
//			$state.go('role.phoenix.subscription.renewal', {'partnerId': id});
//		} else {
//			$state.go('role.phoenix.subscription.request', {'partnerId': id});
//		}
	    } 
	    $scope.licenseAction_sub = function(id,sub_id){
	    	$state.go('role.phoenix.subscription.edit', {'partnerId':id,'subscriptionId': sub_id})
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
	    $scope.createConfirm = function(){
	    	var data = {				    
				    partnerId:$scope.newSubscription['partnerId'],
				    partyId:$scope.newSubscription['partyId'],
				    startDate:$scope.dateFormat($scope.newSubscription['start']),
				    endDate:$scope.dateFormat($scope.newSubscription['end']),
				}
	    	console.log(JSON.stringify(data));
	    	$http({
		        url: $scope.apiUri+'/subscriptions/',
			    data:data,
		        method: 'POST',
			}).success(function(data, status, headers, config){
			}).error(function(data, status, headers, config){
		        alert("create subscription request failed");
			});
	    	$scope.allSubscriptions.unshift(angular.copy($scope.newSubscription));
			$scope.newSubscription = null;
			$scope.adding = false;
	    }
	    function init() {
		console.log($state);
		$scope.setTitle(SubscriptionListModel.title);
		$scope.uiparams = SubscriptionListModel.uiparams;
		$(function () {
            $('#createStart').datepicker();
        });
		$(function () {
            $('#createEnd').datepicker();
        });
	    }
	}
]);
