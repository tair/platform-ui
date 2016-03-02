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
				"partyId": null,
				"partyType": null,
				"country": null,
				"display": null,
				"consortiums": null,
				
			    "username": null,
			    "password": null,
			    "email": null,
			    "institution": null,
			    //"partyId": null,
			    "partnerId": null,
			    "userIdentifier": null,
			},
			uiparams: {
				"colwidth": 'col-xs-7',
			},
		};
	}
]);
