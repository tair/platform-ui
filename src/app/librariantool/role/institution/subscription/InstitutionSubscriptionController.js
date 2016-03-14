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
	'$window',
	'$location',
	'$state',
	'Title',
	'InstitutionSubscriptionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, InstitutionSubscriptionModel) {
	    init();

	    function init() {
		console.log($state);
		$scope.setTitle(InstitutionSubscriptionModel.title);
		$scope.partners = InstitutionSubscriptionModel.partners;
		$scope.activeSubscriptions = InstitutionSubscriptionModel.activeSubscriptions;
		$scope.uiparams = InstitutionSubscriptionModel.uiparams;
	    //load credential
	    if($cookies.credentialId!=null){
			$scope.credentialId = $cookies.credentialId;
		}else if($window.sessionStorage.credentialId!=null){
			$scope.credentialId = $window.sessionStorage.credentialId;
		}
		if($cookies.secretKey!=null){
			$scope.secretKey = $cookies.secretKey;
		}else if($window.sessionStorage.secretKey!=null){
			$scope.secretKey = $window.sessionStorage.secretKey;
		}
		$http({
			url: $scope.apiUri+'/partners/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			//$scope.partners = data;
			/* PW-271
			    homeUri: "https://demotair.arabidopsis.org"
				logoUri: "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif"
				name: "TAIR"
				partnerId: "tair"
				termOfServiceUri: "https://demotair.arabidopsis.org/doc/about/tair
			 */
            $scope.partners = [];
            for (var i = 0; i < data.length; i++) {
                entry = data[i];
                $scope.partners.push({
                	homeUri:entry['homeUri'],
                	logoUri:entry['logoUri'],
                	name:entry['name'],
                	partnerId:entry['partnerId'],
                	termOfServiceUri:entry['termOfServiceUri'],
                	description: ( entry['partnerId']=="tair" ? "Genome database for the reference plant Arabidopsis thaliana":"test description"),
                });
		}
		}).error(function() {
			alert("Cannot get partner information");
		});
		$http({
			url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$scope.credentialId+'/',
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
