/**
 * IndividualInfo Controller
 */

angular.module('boilerplate.subscription.paymentConfirmation.individual').controller(
	/* Name */
	'IndividualPayController',

	/* Dependencies */
	[
	'$scope',
	'$rootScope',
	'IndividualPayModel',

	/* Controller Definition */
	function ($scope, $rootScope, IndividualPayModel) {
		init();

		$scope.resetIndividualPayForm = function() {
			$scope.formdata.firstname = '';
			$scope.formdata.lastname = '';
			$scope.formdata.email = '';
			$scope.formdata.institution = '';
			$scope.formdata.street = '';
			$scope.formdata.city = '';
			$scope.formdata.state = '';
			$scope.formdata.zip = '';
			$scope.formdata.creditcard = '';
			$scope.formdata.expdate = '';
			$scope.formdata.cvc = '';
                };

		$scope.set_pageNum = function(i) {
			$scope.pageNum = i;
		};

		function init() {
			$scope.formdata = IndividualPayModel.formdata;
			$scope.pageNum = IndividualPayModel.pageNum;
                }
	}
]);
