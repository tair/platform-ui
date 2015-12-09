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
		              ],
  			partners: [
      					{
  					        "partnerId": "cdiff",
  					        "name": "CDIFF",
  					        "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/BioCyc.gif",
  					        "termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1",
  						"description": "Description of CDIFF"
  			    		},
      					{
          					"partnerId": "phoenix",
          					"name": "Phoenxi",
          					"logoUri": "",
          					"termOfServiceUri": "",
  						"description": "Phoenix partner for Librarian login"
      					},
      					{
          					"partnerId": "tair",
          					"name": "TAIR",
          					"logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif",
          					"termOfServiceUri": "https://www.arabidopsis.org/doc/about/tair_terms_of_use/417",
  						"description": "Description TAIR"
      					},
      					{
          					"partnerId": "yfd",
          					"name": "YFD",
          					"logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png",
          					"termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1",
  						"description": "Description of YFD"
      					}
  				],
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
  			uiparams: {
				"partnercolwidth": 'col-xs-5',
				"expcolwidth": 'col-xs-3',
				"actionscolwidth": 'col-xs-4'
			}
		};
	}
]);
