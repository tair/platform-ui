/**
 * IndividualInfo Controller
 */

angular.module('boilerplate.subscription.info.individual').controller(
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
			$scope.formdata.numOfSubscribers = '';
			$scope.formadta.userbool = false;
			$scope.formdata.termsbool = false;
		};

		function init() {
			$scope.formdata = IndividualInfoModel.formdata;
			$scope.subscriptions = IndividualInfoModel.subscriptions;
                }
	}
]);
/*
angular.module('boilerplate.subscription.info.individual').filter('discount', function () {
	return function(price, numOfSubscribers) {
		return numOfSubscribers>1 ? price+'*0.9' : price;
	};
});
*/
