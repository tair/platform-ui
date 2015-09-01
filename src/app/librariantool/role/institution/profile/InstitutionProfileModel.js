/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.institution.profile').factory(
	/* Name */
	'InstitutionProfileModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'PROFILE',
			user: {
				"name": "NotSavedInDB",
				"username": "joe432",
				"institution": "University of Awesomeness",
				"email": "joe432@abc.xyz",
				"password": "a34rhdyy",
			},
			uiparams: {
				"colwidth": 'col-md-7',
			},
		};
	}
]);
