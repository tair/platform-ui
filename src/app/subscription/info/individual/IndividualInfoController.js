/**
 * IndividualInfo Controller
 */

angular.module('platform-ui.subscription.info.individual').controller(
	/* Name */
	'IndividualInfoController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	'$scope',
	'$rootScope',
	'IndividualInfoModel',

	/* Controller Definition */
	function ($http, $cookies, $scope, $rootScope, IndividualInfoModel) {
		init();

		$scope.resetIndividualInfoForm = function() {
			$scope.formdata.numOfSubscribers = 0;
			$scope.formadta.userbool = false;
			$scope.formdata.termsbool = false;
		};
	
		$scope.validateInfoIndividualForm = function() {
			return (
				$scope.formdata.numOfSubscribers > 0
					&&
				$scope.formdata.userbool == true 
					&&
				$scope.formdata.termsbool == true
			);
		};

		$scope.setSelectedSubscription = function(id, partner, period, price, discount) {
			$scope.selectedSubscription.subscriptionTermId = id;
			$scope.selectedSubscription.partnerId = partner;
			$scope.selectedSubscription.period = period;
			$scope.selectedSubscription.price = price;
			$scope.selectedSubscription.groupDiscountPercentage = discount;	
		};

		$scope.get_total_price2 = function() {
			if ($scope.selectedSubscription.price == null)
				return null;
			if ($scope.formdata.numOfSubscribers == null)
				return null;
			if ($scope.formdata.numOfSubscribers < 0)
				return 0;
			var num = Math.round($scope.formdata.numOfSubscribers);
			var ret = $scope.selectedSubscription.groupDiscountPercentage>0 ? ( (num >= 2) ? $scope.selectedSubscription.price*num*(1-($scope.selectedSubscription.groupDiscountPercentage/100)) : $scope.selectedSubscription.price*num) : $scope.selectedSubscription.price*num;
			IndividualInfoModel.subtotal = Math.round(ret*100)/100;
			return IndividualInfoModel.subtotal;
		};

		function init() {
		    $scope.formdata = IndividualInfoModel.formdata;
                    $scope.subscriptions = IndividualInfoModel.subscriptions;
                    $scope.selectedSubscription = IndividualInfoModel.selectedSubscription;
                    $cookies.apiKey = 'test123';
                    $http({
                        url:'http://pb.steveatgetexp.com/partners/terms/?partnerId='+$scope.partnerId,
                        method:'GET',
                        withCredentials:true,
                    }).success(function(data, status, headers, config) {
			$scope.subscriptions = data;
                    }).error(function(data, status, headers, config) {
                    });
                };
	}
]);
