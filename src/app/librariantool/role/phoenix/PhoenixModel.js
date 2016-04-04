/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.phoenix').factory(
	/* Name */
	'PhoenixModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'Phoenix',
                    currentTab: {label:"CONSORTIUM", state:"role.phoenix.manage"},
                    tabs: [
                        {label:"INSTITUTION", state:"role.phoenix.institution"},
                        {label:"CONSORTIUM", state:"role.phoenix.manage"},
                        {label:"PROFILE", state:"role.phoenix.profile"},
                    ]
		};
	}
]);
