/**
 * Subscription Controller
 */

angular.module('platform-ui.contentaccess.subscription').controller(
	/* Name */
	'SubscriptionController',

	/* Dependencies */
	[
	'$http',
	'$scope',
	'$location',
	'$cookies',
	'$state',
	'Title',
	'SubscriptionModel',

	/* Controller Definition */
	function ($http, $scope, $location, $state, Title, SubscriptionModel) {
	    init();
	    console.log($state);

            $scope.switchTab = function(tabName) {
		//$scope.currentTab = tabName;
		if (tabName=="landing") {
			$state.go("subscription.landing", {partnerId:$scope.partnerId,redirect:$scope.redirect});
			console.log($state);
			return;
		}
	    };

	    $scope.listInstitution = function($event) {
		$scope.currentTab = 'listTab';
		$event.preventDefault();
	    }

	    function init() {
                //Title.setTitle(SubscriptionModel.title);//PW-264
                $scope.initialheading = SubscriptionModel.initialheading;
                $scope.currentTab = SubscriptionModel.currentTab;
                $scope.tabs = SubscriptionModel.tabs;
		$scope.templates = SubscriptionModel.templates;
		$scope.partnerId = $location.search()['partnerId'];//TODO: need to use $stateParams in the future
		$scope.partner = SubscriptionModel.partner;
		//$scope.institutions = SubscriptionModel.institutions;
		$scope.countries = SubscriptionModel.countries;
		$scope.redirect = $scope.getRedirectNoEncode();
		$scope.redirect = decodeURIComponent($scope.redirect);
		$scope.redirectNoEncode = $scope.getRedirectNoEncode();
		$http({
		    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		});
//		$http({
//					//PW-161 url:$scope.apiUri+'/parties/organizations/',
//					url:$scope.apiUri+'/parties/institutions/?partnerId='+$scope.partnerId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
//                    method:'GET',
//                }).success(function(data, status, headers, config) {
//                    $scope.institutions = data;
//                });
		$http({
                    url:$scope.apiUri+'/parties/countries/',
                    method:'GET',
                }).success(function(data, status, headers, config) {
                    $scope.countries = data.sort();
                });
	    }
	}
]);
