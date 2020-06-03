/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.subscription.commercial').factory(
  /* Name */
  'CommercialModel',

  /* Dependencies */
  [
    function () {
      return {
        currentTab: 'register',
        tabs: {
          notused: {
            id: 'not used',
            text: '1. Choose License',
          },
          tab1: {
            id: 'register',
            text: '2. Your Info',
          },
        },
        templates: {
          register:
            'contentaccess/subscription/commercial/register/register.html',
          thankyou:
            'contentaccess/subscription/commercial/thankyou/thankyou.html',
        },
      }
    },
  ]
)
