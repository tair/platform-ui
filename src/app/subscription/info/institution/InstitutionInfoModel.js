/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.info.institution').factory(
	/* Name */
	'InstitutionInfoModel',

	/* Dependencies */
	[

	function () {
		return {

			formdata: {
				firstname: null,
				lastname: null,
				email: null,
				institution: null,
				librarianName: null,
				librarianEmail: null,
				comments: null,
			},

		}
	}
]);
