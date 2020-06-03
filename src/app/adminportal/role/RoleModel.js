/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role').factory(
  /* Name */
  'RoleModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'Role',
        email: null,
        partyInfo: {},
        /*partyInfo: {
			partyId:null,
			partyType:null,
                        name:'GetExp',
                    },*/
      }
    },
  ]
)
