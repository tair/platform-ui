/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.institution.iprange').factory(
	/* Name */
	'InstitutionIpRangeModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'IP RANGE',
		    newRange: {'name':null, 'start':null, 'end':null},
		    ipranges: [],
		    /*ipranges: [
			{'name':'Randomly Randomized Randomness', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Organized Orange Organs' , 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Cathy Catches Cats', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Ben Bends Benches', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'James Jams Jams', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Andy And Andrew', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Cats Are Awesome', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Cat Catches Catfish', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
			{'name':'Catastrophically Catalized Cataclysm', 'start':'132.42.34', 'end':'12.123.3.52', 'state':null},
		    ]*/
		};
	}
]);
