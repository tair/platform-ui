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
			},
			uiparams: {
				"colwidth": 'col-xs-7',
			},
		};
	}
]);
