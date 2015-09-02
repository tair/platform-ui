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
		    title: 'Consortium',
		    consortiums: [
			{'name':'cats are awesome', 'id':'its true', 'state':null},
			{'name':'cats are too awesome', 'id':'yes its a fact!', 'state':null},
			{'name':'hello world', 'id':'nvm', 'state':null},
		    ]
		};
	}
]);
