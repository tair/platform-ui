/**
 * InstitutionSubscription Controller
 */

angular.module('platform-ui.librariantool.role.institution.subscription').controller(
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
		$scope.setTitle(InstitutionSubscriptionModel.title);
		$scope.partners = InstitutionSubscriptionModel.partners;
		$scope.activeSubscriptions = InstitutionSubscriptionModel.activeSubscriptions;
		$scope.uiparams = InstitutionSubscriptionModel.uiparams;
		$http({
			url: $scope.apiUri+'/partners/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
			/*
			 *  homeUri: "https://demotair.arabidopsis.org"
				logoUri: "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif"
				name: "TAIR"
				partnerId: "tair"
				termOfServiceUri: "https://demotair.arabidopsis.org/doc/about/tai
			 */ //TODO
			//if (data[1].partnerId == "tair")
			if (data['partnerId'] == "tair")
				$scope.partners['description']="Genome database for the reference plant Arabidopsis thaliana";
			else
				$scope.partners['description']="test description.";
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$cookies.credentialId+'/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.activeSubscriptions = data;
		}).error(function() {
			alert("Cannot get active subscription information");
		});
		$state.go('role.institution.subscription.list');
	    }
	}
]);
