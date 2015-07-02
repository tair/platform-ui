/**
 * IndividualInfo Controller
 */

angular.module('platform-ui.subscription.paymentConfirmation.individual').controller(
	/* Name */
	'IndividualPayController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	'$scope',
	'$rootScope',
	'IndividualPayModel',
	'IndividualInfoModel',
	/* Controller Definition */
	function ($http, $cookies, $scope, $rootScope, IndividualPayModel, IndividualInfoModel) {
		init();

		$scope.resetIndividualPayForm = function() {
			$scope.formdata.firstname = null;
			$scope.formdata.lastname = null;
			$scope.formdata.email = null;
			$scope.formdata.institution = null;
			$scope.formdata.street = null;
			$scope.formdata.city = null;
			$scope.formdata.state = null;
			$scope.formdata.zip = null;
			$scope.formdata.creditcard = null;
			$scope.formdata.expmonth = null;
			$scope.formdata.expyear = null;
			$scope.formdata.cvc = null;
                };

		$scope.set_pageNum = function(i) {
			$scope.pageNum = i;
		};

		$scope.validateIndividualPayForm = function() {
			return (
				$scope.formdata.firstname != null
					&&
				$scope.formdata.lastname != null
					&&
				$scope.formdata.email != null
					&&
				$scope.formdata.institution != null
					&&
				$scope.formdata.street != null
					&&
				$scope.formdata.city != null
					&&
				$scope.formdata.state != null
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

		$scope.makeCharge = function(bool) {
			Stripe.setPublishableKey('pk_test_VEu0r74glZkzeT8IXLmXxojP');
			var stripeData = {
				name: $scope.formdata.firstname + ' ' + $scope.formdata.lastname,
				address_line1: $scope.formdata.street,
				address_city: $scope.formdata.city,
				address_state: $scope.formdata.state,
				address_zip: $scope.formdata.zip,
				number: $scope.formdata.creditcard,
				cvc: $scope.formdata.cvc,
				exp_month: $scope.formdata.expmonth,
				exp_year: $scope.formdata.expyear
			};
			Stripe.card.createToken(stripeData, function(status, response) {
				if (response.error) {
					$scope.stripeerrors = ''+response.error.message;
				} else { 
					$scope.stripeerrors = null;
					$scope.last4 = response.card.last4;
					if (bool) {
					    $cookies.apiKey = 'test123';
					    $http({
						url:'http://pb.steveatgetexp.com/subscriptions/payments/',
						data:{
						    'stripeToken':response.id,
						    'price':$scope.subtotal,
						    'termId':$scope.subscriptionTermId,
						    'quantity':$scope.quantity,
						    'email':$scope.formdata.email
						},
						method:'POST',
						withCredentials:true,
					    }).success(function(data, status, headers, config) {
					    }).error(function(data, status, headers, config) {
					    });
					}
					$scope.pageNum++;
				}
				$scope.$apply();
			});
		};

		function init() {
		    $scope.formdata = IndividualPayModel.formdata;
		    $scope.pageNum = IndividualPayModel.pageNum;
		    $scope.fees = IndividualPayModel.fees;
		    $scope.quantity = IndividualInfoModel.formdata.numOfSubscribers;
		    $scope.subtotal = IndividualInfoModel.subtotal;
		    $scope.period = IndividualInfoModel.selectedSubscription.period; 
		    $scope.subscriptionTermId = IndividualInfoModel.selectedSubscription.subscriptionTermId;
                }
	}
]);
