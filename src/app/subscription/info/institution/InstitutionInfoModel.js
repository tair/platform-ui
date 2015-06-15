/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('boilerplate.subscription.info.institution').factory(
	/* Name */
	'InstitutionInfoModel',

	/* Dependencies */
	[

	function () {
		return {

			formdata: {
				firstname: '',
				lastname: '',
				email: '',
				institution: '',
				librarianName: '',
				librarianEmail: '',
				comments: '',
			},

		}
	}
]);
