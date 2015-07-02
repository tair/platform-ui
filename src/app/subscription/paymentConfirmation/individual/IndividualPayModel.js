/**
 * Individual Pay Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.paymentConfirmation.individual').factory(
	/* Name */
	'IndividualPayModel',

	/* Dependencies */
	[
	function (IndividualInfoModel) {
		return {

			formdata: {
                                firstname: null,
                                lastname: null,
                                email: null,
                                institution: null,
                                street: null,
                                city: null,
                                state: null,
                                zip: null,
                                creditcard: null,
                                expmonth: null,
				expyear: null,
                                cvc: null,
                        },
			
			pageNum: 1,

			fees: 9.99,
			
		}
	}
]);
