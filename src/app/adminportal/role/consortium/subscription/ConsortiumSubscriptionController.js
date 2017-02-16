/**
 * ConsortiumSubscription Controller
 */

angular.module('platform-ui.adminportal.role.consortium.subscription').controller(
	/* Name */
	'ConsortiumSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumSubscriptionModel) {
	    init();
        
            function init() {
                console.log($state);
                $scope.setCurrentTab(ConsortiumSubscriptionModel.currentTab);
                $scope.partners = ConsortiumSubscriptionModel.partners;
                $scope.activeSubscriptions = ConsortiumSubscriptionModel.activeSubscriptions;
                $scope.allSubscriptions = ConsortiumSubscriptionModel.allSubscriptions;
                $scope.uiparams = ConsortiumSubscriptionModel.uiparams;
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
                $http({
                        url: $scope.apiUri+'/partners/',
                        method: 'GET',
                }).success(function(data, status, headers, config) {
                        $scope.partners = data;
                }).error(function() {
                        alert("Cannot get partner information");
                });
                $http({
                        url: $scope.apiUri+'/subscriptions/?partyId='+$scope.consortiumId+'&active=true',
                        method: 'GET',
                        headers: {'Authorization': 'JWT '+$scope.token},
                }).success(function(data, status, headers, config) {
	                	var dataObject = {};
	                	for (var i=0; i<data.length; i++) {
	        				var item = data[i];
	        				dataObject[item['partnerId']] = item;
	        			}
                        $scope.activeSubscriptions = dataObject;
                }).error(function() {
                        alert("Cannot get active subscription information");
                });
                $http({
	                    url: $scope.apiUri+'/subscriptions/?partyId='+$scope.consortiumId,
	                    method: 'GET',
	                    headers: {'Authorization': 'JWT '+$scope.token},
	            }).success(function(data, status, headers, config) {
		            	var dataObject = {};
		            	for (var i=0; i<data.length; i++) {
		    				var item = data[i];
		    				dataObject[item['partnerId']] = item;
		    			}
	                    $scope.allSubscriptions = dataObject;
	            }).error(function() {
	                    alert("Cannot get all subscription information");
	            });
                $state.go('role.consortium.subscription.list');
            }
	}
]);
