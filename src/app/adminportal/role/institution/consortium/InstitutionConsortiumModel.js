/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.institution.consortium').factory(
  /* Name */
  'InstitutionConsortiumModel',

  /* Dependencies */
  [
    function () {
      return {
        currentTab: {
          label: 'CONSORTIUM',
          state: 'role.institution.consortium',
        },
        newConsortium: { name: null, country: null },
        consortiums: [
          {
            partyId: 31272,
            partyType: 'consortium',
            name: 'UC consortium',
            country: 219,
            display: true,
            consortium: null,
            state: null,
          },
          {
            partyId: 31273,
            partyType: 'consortium',
            name: 'Unbelievable Consortium',
            country: 219,
            display: true,
            consortium: null,
            state: null,
          },
        ],
        sortings: [
          { predicate: 'name', reverse: false, text: 'Name' },
          { predicate: 'partyId', reverse: false, text: 'Party ID' },
        ],
      }
    },
  ]
)
