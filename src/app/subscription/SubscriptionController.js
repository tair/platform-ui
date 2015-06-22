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
	'Title',
	'SubscriptionModel',

	/* Controller Definition */
	function ($cookies, $http, $scope, Title, SubscriptionModel) {
		init();
		$scope.next = function() {
			switch($scope.currentTab) {
				case 'chooseTab':
					if ($scope.license != 'def') {
						$scope.currentTab = 'infoTab';
					}
					break;
				case 'infoTab':
					$scope.currentTab = 'paymentConfirmationTab';
					break;
				case 'paymentConfirmationTab':
					break;
			}
		};

		$scope.back = function() {
			switch($scope.currentTab) {
				case 'infoTab':
					$scope.currentTab = 'chooseTab';
					break;
				case 'paymentConfirmationTab':
					$scope.currentTab = 'infoTab';
					break;
			}
		};

		$scope.set_license = function(str) {
			$scope.license = str;
		};

		function init() {
                        Title.setTitle(SubscriptionModel.title);
                        $scope.initialheading = SubscriptionModel.initialheading;
                        $scope.license = SubscriptionModel.license;
                        $scope.licenses = SubscriptionModel.licenses;
                        $scope.currentTab = SubscriptionModel.currentTab;
                        $scope.tabs = SubscriptionModel.tabs;
			$scope.templates = SubscriptionModel.templates;
		    $cookies.apiKey = 'test123';
		    $http({
                        url:'http://pb.steveatgetexp.com/partners/descriptions/?partnerId=cdiff&includeText=True',
                        method:'GET',
			withCredentials:true,
                    }).success(function(data, status, headers, config) {
                            $scope.licenses=data;
                    }).error(function(data, status, headers, config) {
                    });
                }
	}
]);
