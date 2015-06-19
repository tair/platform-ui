/**
 * Individual Pay Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.paymentConfirmation.individual').factory(
	/* Name */
	'IndividualPayModel',

	/* Dependencies */
	[

	function () {
		return {

			formdata: {
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
                        },
			
			pageNum: 1,
		}
	}
]);
