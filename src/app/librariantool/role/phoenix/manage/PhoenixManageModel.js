/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.phoenix.manage').factory(
	/* Name */
	'PhoenixManageModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'MANAGE',
			newConsortium: {"name":null,"country":null},
			consortiums: [
			              {
			            	    "partyId": 31272,
			            	    "partyType": "consortium",
			            	    "name": "UC consortium",
			            	    "country": 219,
			            	    "display": true,
			            	    "consortium": null,
			            	    "state": null
			            	  },
			            	  {
			            	    "partyId": 31273,
			            	    "partyType": "consortium",
			            	    "name": "Unbelievable Consortium",
			            	    "country": 219,
			            	    "display": true,
			            	    "consortium": null,
			            	    "state":null
			            	  }
			            	],
        	sortings: [
 		              {sortField:'name', reverse:false, text:"Name"},
 		              ]
		};
	}
]);
