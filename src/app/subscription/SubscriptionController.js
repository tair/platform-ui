/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription').controller(
	/* Name */
	'SubscriptionController',

	/* Dependencies */
	[
	'$cookies',
	'$http',
	'$scope',
	'$location',
	'Title',
	'SubscriptionModel',

	/* Controller Definition */
	function ($cookies, $http, $scope, $location, Title, SubscriptionModel) {
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
		$scope.redirect = $location.search()['redirect'];
		$http({
		    url:'http://pb.steveatgetexp.com/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		    withCredentials:true,
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		});
		$http({
                    url:'http://pb.steveatgetexp.com/parties/organizations/',
                    method:'GET',
                    withCredentials:true,
                }).success(function(data, status, headers, config) {
                    $scope.institutions = data;
                });
		$http({
                    url:'http://pb.steveatgetexp.com/parties/countries/',
                    method:'GET',
                    withCredentials:true,
                }).success(function(data, status, headers, config) {
                    $scope.countries = data.sort();
                });
	    }
	}
]);
