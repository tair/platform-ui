/**
 * IndividualInfo Controller
 */

angular.module('platform-ui.subscription.individual').controller(
	/* Name */
	'IndividualController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	'$scope',
	'$rootScope',
	'IndividualModel',

	/* Controller Definition */
	function ($http, $cookies, $scope, $rootScope, IndividualModel) {
	    init();
	    
            $scope.next = function(nextTab) {
                $scope.currentTab = nextTab;
            }
	    
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
			if ($scope.info.numOfSubscribers == null)
				return null;
			if ($scope.info.numOfSubscribers < 0)
				return 0;
			var num = Math.round($scope.info.numOfSubscribers);
			var ret = $scope.selectedSubscription.groupDiscountPercentage>0 ? ( (num >= 2) ? $scope.selectedSubscription.price*num*(1-($scope.selectedSubscription.groupDiscountPercentage/100)) : $scope.selectedSubscription.price*num) : $scope.selectedSubscription.price*num;
			$scope.info.subtotal = Math.round(ret*100)/100;
			return $scope.info.subtotal;
		};

                $scope.makeCharge = function(bool, next) {
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
                                            'price':$scope.info.subtotal,
                                            'termId':$scope.selectedSubscription.subscriptionTermId,
                                            'quantity':$scope.info.numOfSubscribers,
                                            'email':$scope.formdata.email,
					    'firstName':$scope.formdata.firstname,
					    'lastName':$scope.formdata.lastname,
					    'institute': $scope.formdata.institution,
					    'street':$scope.formdata.street,
					    'city': $scope.formdata.city,
					    'state': $scope.formdata.state,
					    'country': $scope.formdata.country,
					    'zip': $scope.formdata.zip
                                        },
                                        method:'POST',
                                        withCredentials:true,
                                    }).success(function(data, status, headers, config) {
                                    }).error(function(data, status, headers, config) {
                                    });
                                }
                                $scope.next(next);
                            }
                            $scope.$apply();
                        });
                };


		function init() {
		    $scope.formdata = IndividualModel.formdata;
		    $scope.currentTab = IndividualModel.currentTab;
		    $scope.tabs = IndividualModel.tabs;
		    $scope.templates = IndividualModel.templates;
		    $scope.info = IndividualModel.info;
                    $scope.selectedSubscription = IndividualModel.selectedSubscription;
                };
	}
]);
