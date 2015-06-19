/**
 * IndividualInfo Controller
 */

angular.module('platform-ui.subscription.info.individual').controller(
	/* Name */
	'IndividualInfoController',

	/* Dependencies */
	[
	'$scope',
	'$rootScope',
	'IndividualInfoModel',

	/* Controller Definition */
	function ($scope, $rootScope, IndividualInfoModel) {
		init();

		$scope.resetIndividualInfoForm = function() {
			$scope.formdata.numOfSubscribers = 0;
			$scope.formadta.userbool = false;
			$scope.formdata.termsbool = false;
		};
	
		$scope.get_total_price = function(price, num) {
			if (num < 0)
				return 0;
			num = Math.round(num);
			return $scope.groupDiscount.available ? ( (num >= $scope.groupDiscount.group) ? price*num*(1-($scope.groupDiscount.percentage/100)) : price*num ) : price*num;
		};

		function init() {
			$scope.formdata = IndividualInfoModel.formdata;
			$scope.subscriptions = IndividualInfoModel.subscriptions;
			$scope.groupDiscount = IndividualInfoModel.groupDiscount;
                }
	}
]);
/*
angular.module('platform-ui.subscription.info.individual').filter('discount', function () {
	return function(price, numOfSubscribers) {
		return numOfSubscribers>1 ? price+'*0.9' : price;
	};
});
*/
