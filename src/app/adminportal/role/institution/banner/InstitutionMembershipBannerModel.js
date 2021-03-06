/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.institution.banner').factory(
  /* Name */
  'InstitutionMembershipBannerModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'MEMBERSHIP BANNER',
        currentTab: { label: 'BANNER', state: 'role.institution.banner' },
        imageInfo: {
          partyId: null,
          name: null,
          imageUrl: null,
        },
        uiparams: {
          colwidth: 'col-xs-10',
        },
      }
    },
  ]
)
