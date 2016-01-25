/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.manage').factory(
	/* Name */
	'ConsortiumManageModel',

	/* Dependencies */
	[

	function () {
	    return {
		'selectedInstitution':{
			'partyId': 2,
		    'name':'getexp inc',
		    'state':null,
		},
	    };
	}
]);
