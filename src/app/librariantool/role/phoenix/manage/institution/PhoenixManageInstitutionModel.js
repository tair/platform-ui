/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.phoenix.manage.institution').factory(
	/* Name */
	'PhoenixManageInstitutionModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'UC Consortium',
		    newRange: {'name':null, 'start':null, 'end':null},
		    ipranges: [],
		    institutions:[
		                  {
		                	    "partyId": 55,
		                	    "partyType": "organization",
		                	    "name": "UC Davis",
		                	    "country": 169,
		                	    "display": true,
		                	    "consortium": 31272
		                	  },
		                	  {
		                	    "partyId": 56,
		                	    "partyType": "organization",
		                	    "name": "UC Los Angeles",
		                	    "country": 169,
		                	    "display": true,
		                	    "consortium": 31272
		                	  },
		                	  {
		                	    "partyId": 57,
		                	    "partyType": "organization",
		                	    "name": "UC Merced",
		                	    "country": 169,
		                	    "display": true,
		                	    "consortium": 31272
		                	  },
		                	  {
		                	    "partyId": 58,
		                	    "partyType": "organization",
		                	    "name": "UC Santa Cruz",
		                	    "country": 169,
		                	    "display": true,
		                	    "consortium": 31272
		                	  },
		                	  {
		                	    "partyId": 31275,
		                	    "partyType": "organization",
		                	    "name": "UC Los Angeles",
		                	    "country": 169,
		                	    "display": true,
		                	    "consortium": 31272
		                	  }
		                	],
		    sortings: [
			          {predicate:'name', reverse:false, text:"Name"},
		              {predicate:'partyId', reverse:false, text:"Party ID"},
		              ]
		};
	}
]);
