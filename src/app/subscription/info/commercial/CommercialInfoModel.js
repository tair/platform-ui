/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('boilerplate.subscription.info.commercial').factory(
	/* Name */
	'CommercialInfoModel',

	/* Dependencies */
	[

	function () {
		return {

			formdata: {
				firstname: '',
				lastname: '',
				email: '',
				institution: '',
				license: 0,
				comments: '',
			},

		}
	}
]);
