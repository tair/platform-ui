/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.phoenix.profile').factory(
	/* Name */
	'PhoenixProfileModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'PROFILE',
			currentTab: {label:"PROFILE", state:"role.phoenix.profile"},
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
