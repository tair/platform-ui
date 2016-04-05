/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.subscription').factory(
	/* Name */
	'ConsortiumSubscriptionModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Consortium Subscription',
			currentTab: {label: 'SUBSCRIPTION', state: 'role.consortium.subscription'},
			partners: [],
			activeSubscriptions: {},
//			partners: [],
			partners: [
			           {
			        	    "partnerId": "biocyc",
			        	    "name": "BioCyc Database Collection",
			        	    "logoUri": "http://biocyc.org/BioCyc.gif",
			        	    "homeUri": "http://cdifficile.ai.sri.com",
			        	    "termOfServiceUri": "http://biocyc.org/disclaimer.shtml",
			        	    "description": "BioCyc is a collection of 7667 Pathway/Genome Databases (PGDBs), plus software tools for understanding their data."
			        	  },
			        	  {
			        	    "partnerId": "phoenix",
			        	    "name": "Phoenix",
			        	    "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif",
			        	    "homeUri": "https://demotair.arabidopsis.org",
			        	    "termOfServiceUri": "https://demotair.arabidopsis.org/doc/about/tair_terms_of_use/417",
			        	    "description": null
			        	  },
			        	  {
			        	    "partnerId": "tair",
			        	    "name": "TAIR",
			        	    "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/tair_logo_highdef_originalcolors.png",
			        	    "homeUri": "https://demotair.arabidopsis.org",
			        	    "termOfServiceUri": "https://demotair.arabidopsis.org/doc/about/tair_terms_of_use/417",
			        	    "description": "Genome database for the reference plant Arabidopsis thaliana"
			        	  }
			        	],
//			activeSubscriptions: {},
			activeSubscriptions: {
				"tair": {
					"subscriptionId": 3994,
					"partyId": 35846,
					"partnerId": "tair",
	 				"startDate": "2014-04-01T12:00:00Z",
					"endDate": "2017-03-31T12:00:00Z"
				},
				"cdiff": {
					"subscriptionId": 13994,
					"partyId": 35846,
					"partnerId": "cdiff",
					"startDate": "2012-04-01T12:00:00Z",
					"endDate": "2018-03-31T12:00:00Z"
				},
			},
		};
	}
]);
