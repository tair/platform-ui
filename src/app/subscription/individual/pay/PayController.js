/**
 * Pay Controller
 */

angular.module('platform-ui.subscription.individual.pay').controller(
	/* Name */
	'PayController',

	/* Dependencies */
	[
	'$scope',
	'PayModel',

	/* Controller Definition */
	function ($scope, PayModel) {
		init();

		$scope.reset = function() {
		    $scope.formdata.firstname = null;
		    $scope.formdata.lastname = null;
		    $scope.formdata.email = null;
		    $scope.formdata.emailConfirm = null;
		    $scope.formdata.institution = null;
		    $scope.formdata.street = null;
		    $scope.formdata.city = null;
		    $scope.formdata.state = null;
		    $scope.formdata.country = null;
		    $scope.formdata.zip = null;
		    $scope.formdata.creditcard = null;
		    $scope.formdata.expmonth = null;
		    $scope.formdata.expyear = null;
		    $scope.formdata.cvc = null;
                };

		$scope.validate = function() {
		    return (
			$scope.formdata.firstname != null
			    &&
			    $scope.formdata.lastname != null
			    &&
			    $scope.formdata.email != null
			    &&
			    $scope.formdata.emailConfirm == $scope.formdata.email
			    &&
			    $scope.formdata.institution != null
			    &&
			    $scope.formdata.street != null
			    &&
			    $scope.formdata.city != null
			    &&
			    $scope.formdata.country != null
			    &&
			    $scope.formdata.zip != null
			    &&
			    Stripe.card.validateCardNumber($scope.formdata.creditcard)
			    &&
			    Stripe.card.validateExpiry($scope.formdata.expmonth, $scope.formdata.expyear)
			    &&
			    Stripe.card.validateCVC($scope.formdata.cvc)
		    );
		};

		$scope.validateAndSubmit = function() {
			$scope.stripeerrors = null;
			if ($scope.formdata.firstname == null) {
				$scope.stripeerrors = 'Please provide a firstname.';
				return false;
			}
			if ($scope.formdata.lastname == null) {
				$scope.stripeerrors = 'Please provide a lastname.';
				return false;
			}
			if ($scope.formdata.email == null) {
				$scope.stripeerrors = 'Please provide an email.';
				return false;
			}
			if ($scope.formdata.emailConfirm != $scope.formdata.email) {
				$scope.stripeerrors = 'Email addresses must match';
				return false;
			}	
			if ($scope.formdata.institution == null) {
				$scope.stripeerrors = 'Please provide an institution.';
				return false;
			}
			if ($scope.formdata.street == null) {
				$scope.stripeerrors = 'Please provide a streetname.';
				return false;
			}
			if ($scope.formdata.city == null) {
				$scope.stripeerrors = 'Please provide a city.';
				return false;
			}
			if ($scope.formdata.country == null) {
				$scope.stripeerrors = 'Please provide a country.';
				return false;
			}
			if ($scope.formdata.zip == null) {
				$scope.stripeerrors = 'Please provide zip/postal code.';
				return false;
			}
			if (!(Stripe.card.validateCardNumber($scope.formdata.creditcard))) {
				$scope.stripeerrors = 'Please provide a valid card number.';
				return false;
			}
			if (!(Stripe.card.validateExpiry($scope.formdata.expmonth, $scope.formdata.expyear))) {
				$scope.stripeerrors = 'Please provide a valid expiry date.';
				return false;
			}
			if (!(Stripe.card.validateCVC($scope.formdata.cvc))) {
				$scope.stripeerrors = 'Please provide a valid CVC.';
				return false;
			}
			return true;
		};

		function init() {
                }
	}
]);
