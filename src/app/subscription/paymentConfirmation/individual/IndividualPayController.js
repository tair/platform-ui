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
                        $scope.formdata = {
                                firstname: '',
                                lastname: '',
                                email: '',
                                institution: '',
                                street: '',
                                city: '',
                                state: '',
                                zip: '',
                                creditcard: '',
                                expdate: '',
                                cvc: '',
                        }
                };

		function init() {
			$scope.formdata = IndividualPayModel.formdata;
                }
	}
]);
