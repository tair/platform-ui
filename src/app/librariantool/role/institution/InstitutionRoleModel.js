/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.institution').factory(
	/* Name */
	'InstitutionRoleModel',

	/* Dependencies */
	[

	function () {
		return {
		    title: 'Institution',
		    currentTab: {label:"IP RANGE", state:"role.institution.iprange"},
		    tabs: [
			{label:"IP RANGE", state:"role.institution.iprange"},
			{label:"SUBSCRIPTION", state:"role.institution.subscription"},
			{label:"USAGE", state:"role.institution.usage"},
			{label:"PROFILE", state:"role.institution.profile"},
		    ]
		};
	}
]);
