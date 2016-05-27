/**
 * InstitutionSubscription Controller
 */

angular.module('platform-ui.adminportal.role.institution.subscription').controller(
	/* Name */
	'InstitutionSubscriptionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionSubscriptionModel) {
	    init();

	    function init() {
		console.log($state);
		$scope.setCurrentTab(InstitutionSubscriptionModel.currentTab);
		$scope.partners = InstitutionSubscriptionModel.partners;
		$scope.activeSubscriptions = InstitutionSubscriptionModel.activeSubscriptions;
		$scope.allSubscriptions = InstitutionSubscriptionModel.allSubscriptions;
		$scope.uiparams = InstitutionSubscriptionModel.uiparams;
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		$http({
			url: $scope.apiUri+'/partners/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
            $scope.partners = [];
            for (var i = 0; i < data.length; i++) {
                entry = data[i];
                $scope.partners.push({
                	homeUri:entry['homeUri'],
                	logoUri:entry['logoUri'],
                	name:entry['name'],
                	partnerId:entry['partnerId'],
                	termOfServiceUri:entry['termOfServiceUri'],
                	description:entry['description'],//Partner.description tbl.column PW-271
                	state:null,
                });
		}
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$scope.institutionId+'/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.activeSubscriptions = data;
		}).error(function() {
			alert("Cannot get active subscription information");
		});
		        $http({
	                    url: $scope.apiUri+'/subscriptions/allsubscriptions/'+$scope.institutionId+'/',
	                    method: 'GET',
	            }).success(function(data, status, headers, config) {
	                    $scope.allSubscriptions = data;
	            }).error(function() {
	                    alert("Cannot get all subscription information");
	            });
		$state.go('role.institution.subscription.list');
	    }
	}
]);
