/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.commercial.register').factory(
	/* Name */
	'CommercialRegisterModel',

	/* Dependencies */
	[

	function () {
	    return {
		formdata: {
		    firstName: null,
		    lastName: null,
		    email: null,
		    institution: null,
		    individualLicense: false,
		    companyLicense: false,
		    comments: '',
		    partnerName: null,
		},
	    }
	}
]);
