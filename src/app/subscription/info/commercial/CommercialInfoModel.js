/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.info.commercial').factory(
	/* Name */
	'CommercialInfoModel',

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
			},

		}
	}
]);
