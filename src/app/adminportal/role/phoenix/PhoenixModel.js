/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.phoenix').factory(
	/* Name */
	'PhoenixModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'Phoenix',
                    currentTab: {label:"CONSORTIUM", state:"role.phoenix.consortium"},
                    tabs: [
                        {label:"CONSORTIUM", state:"role.phoenix.consortium"},
                        {label:"INSTITUTION", state:"role.phoenix.institution"},
                        {label:"PROFILE", state:"role.phoenix.profile"},
                        {label:"SUBSCRIPTION", state:"role.phoenix.subscription"},
                        {label:"MEMBERSHIP BANNER", state:"role.phoenix.banner"},
                    ]
		};
	}
]);
