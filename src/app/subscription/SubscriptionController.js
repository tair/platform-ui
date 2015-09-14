/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription').controller(
	/* Name */
	'SubscriptionController',

	/* Dependencies */
	[
	'$http',
	'$scope',
	'$location',
	'Title',
	'SubscriptionModel',

	/* Controller Definition */
	function ($http, $scope, $location, Title, SubscriptionModel) {
	    init();

            $scope.switchTab = function(tabName) {
		$scope.currentTab = tabName;
	    };

	    $scope.listInstitution = function($event) {
		$scope.currentTab = 'listTab';
		$event.preventDefault();
	    }

	    function init() {
                Title.setTitle(SubscriptionModel.title);
                $scope.initialheading = SubscriptionModel.initialheading;
                $scope.currentTab = SubscriptionModel.currentTab;
                $scope.tabs = SubscriptionModel.tabs;
		$scope.templates = SubscriptionModel.templates;
		$scope.partnerId = $location.search()['partnerId'];
		$scope.partner = SubscriptionModel.partner;
		$scope.institutions = SubscriptionModel.institutions;
		$scope.countries = SubscriptionModel.countries;
		$scope.redirect = $scope.getRedirect();
		$scope.redirectNoEncode = $scope.getRedirectNoEncode();
		$http({
		    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		});
		$http({
                    url:$scope.apiUri+'/parties/organizations/',
                    method:'GET',
                }).success(function(data, status, headers, config) {
                    $scope.institutions = data;
                });
		$http({
                    url:$scope.apiUri+'/parties/countries/',
                    method:'GET',
                }).success(function(data, status, headers, config) {
                    $scope.countries = data.sort();
                });
	    }
	}
]);
