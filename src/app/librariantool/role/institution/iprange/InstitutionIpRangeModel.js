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
		    ipranges: [
			{'name':'Randomly Randomized Randomness', 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Organized Orange Organs' , 'start':'123.45.67', 'end':'89.12.345', 'state':null},
			{'name':'Cathy Catches Cats', 'start':'123.45.67', 'end':'89.12.345', 'state':null}
		    ]
		};
	}
]);
