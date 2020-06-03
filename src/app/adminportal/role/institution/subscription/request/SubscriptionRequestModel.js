/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular
  .module('platform-ui.adminportal.role.institution.subscription.request')
  .factory(
    /* Name */
    'SubscriptionRequestModel',

    /* Dependencies */
    [
      function () {
        return {
          title: 'SUBSCRIPTION',
          uiparams: {
            colwidth: 'col-xs-11',
          },
        }
      },
    ]
  )
