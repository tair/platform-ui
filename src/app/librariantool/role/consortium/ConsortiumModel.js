/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium').factory(
	/* Name */
	'ConsortiumModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'Consortium',
                    currentTab: {label:"MANAGE INSTITUTION", state:"role.consortium.manage"},
                    tabs: [
                        {label:"MANAGE INSTITUTION", state:"role.consortium.manage"},
                        {label:"SUBSCRIPTION", state:"role.consortium.subscription"},
                        {label:"USAGE", state:"role.consortium.usage"},
                        {label:"PROFILE", state:"role.consortium.profile"},
                    ]
		};
	}
]);
