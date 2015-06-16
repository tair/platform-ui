/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('boilerplate.subscription.info.individual').factory(
	/* Name */
	'IndividualInfoModel',

	/* Dependencies */
	[

	function () {
		return {

			formdata: {
				firstname: '',
				lastname: '',
				email: '',
				individual: '',
				librarianName: '',
				librarianEmail: '',
				comments: '',
			},

		}
	}
]);
