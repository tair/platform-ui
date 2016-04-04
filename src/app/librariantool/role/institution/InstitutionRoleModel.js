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
		    getTabs: function (role) {
        if (role == 'admin') {
          return [
            {
              label: 'IP RANGE',
              state: 'role.institution.iprange'
            },
            {
              label: 'CONSORTIUM',
              state: 'role.institution.consortium'
            },
            {
              label: 'SUBSCRIPTION',
              state: 'role.institution.subscription'
            },
            {
              label: 'PROFILE',
              state: 'role.institution.profile'
            }
          ];
        } else {
          return [
            {
              label: 'IP RANGE',
              state: 'role.institution.iprange'
            },
            {
              label: 'SUBSCRIPTION',
              state: 'role.institution.subscription'
            },
            {
              label: 'USAGE',
              state: 'role.institution.usage'
            },
            {
              label: 'PROFILE',
              state: 'role.institution.profile'
            }
          ];
        }
      }
		};
	}
]);
