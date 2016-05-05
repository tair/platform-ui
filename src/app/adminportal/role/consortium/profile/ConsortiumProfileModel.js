/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.consortium.profile').factory(
	/* Name */
	'ConsortiumProfileModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'PROFILE',
			currentTab: {label:"PROFILE", state:"role.consortium.profile"},
//			user: {
//				"partyId": null,
//				"partyType": null,
//				"country": null,
//				"display": null,
//				"consortiums": null,
//				
//			    "username": null,
//			    "password": null,
//			    "email": null,
//			    "institution": null,
//			    //"partyId": null,
//			    "partnerId": null,
//			    "userIdentifier": null,
//			},
			user: {
				"partyId": null,
				"partyType": null,
				"country": null,
				"display": null,
				"consortiums": null,
				
			    "username": 'ucconsortium',
			    "password": null,
			    "email": 'ucconsortium@arabidopsis.org',
			    "institution": null,
			    //"partyId": null,
			    "partnerId": null,
			    "userIdentifier": null,
			    "name": 'UC consortium',
			},
			uiparams: {
				"colwidth": 'col-xs-7',
			},
		};
	}
]);
