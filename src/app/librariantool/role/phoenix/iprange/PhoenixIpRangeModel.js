/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.phoenix.iprange').factory(
	/* Name */
	'PhoenixIpRangeModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'INSTITUTION',
		    newRange: {'name':null, 'start':null, 'end':null},
//		    ipranges: [],
		    ipranges: [
			{'name':'Randomly Randomized Randomness', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Organized Orange Organs' , 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Cathy Catches Cats', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Ben Bends Benches', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'James Jams Jams', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Andy And Andrew', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Cats Are Awesome', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Cat Catches Catfish', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Catastrophically Catalized Cataclysm', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
		    ],
		    partners:[
		              {
		            	    "partnerId": "phoenix",
		            	    "name": "Phoenix",
		            	    "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png",
		            	    "termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1"
		            	  },
		            	  {
		            	    "partnerId": "tair",
		            	    "name": "TAIR",
		            	    "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif",
		            	    "termOfServiceUri": "https://www.arabidopsis.org/doc/about/tair_terms_of_use/417"
		            	  },
		            	  {
		            	    "partnerId": "yfd",
		            	    "name": "YFD",
		            	    "logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png",
		            	    "termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1"
		            	  }
		            	],
        	uiparams: {
				"partnercolwidth": 'col-xs-5',
				"expcolwidth": 'col-xs-3',
				"actionscolwidth": 'col-xs-4'
			},
		    sortings: [
		              {sortField:'start', reverse:false, text:"start IP"},
		              {sortField:'name', reverse:false, text:"Label"}
		              ]
		};
	}
]);
