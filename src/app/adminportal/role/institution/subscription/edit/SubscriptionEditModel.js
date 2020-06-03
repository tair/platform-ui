/**
 * Subscription Edit Model
 */

angular
  .module('platform-ui.adminportal.role.institution.subscription.edit')
  .factory(
    /* Name */
    'SubscriptionEditModel',

    /* Dependencies */
    [
      function () {
        return {
          uiparams: {
            colwidth: 'col-xs-11',
          },
        }
      },
    ]
  )
