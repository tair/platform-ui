/**
 * Subscription Edit Model
 */

angular
  .module('platform-ui.adminportal.role.consortium.subscription.edit')
  .factory(
    /* Name */
    'ConsortiumSubscriptionEditModel',

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
