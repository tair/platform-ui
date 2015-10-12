/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.phoenix.profile').factory(
	/* Name */
	'PhoenixProfileModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'PROFILE',
			user: {
				"name": null,
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
