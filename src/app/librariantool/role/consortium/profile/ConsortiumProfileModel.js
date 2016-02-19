/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.profile').factory(
	/* Name */
	'ConsortiumProfileModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Consortium',
			user: {
				"name": "test",
				"username": null,
				"institution": null,
				"email": null,
				"password": null,
			},
			uiparams: {
				"colwidth": 'col-xs-7',
			},
		};
	}
]);
