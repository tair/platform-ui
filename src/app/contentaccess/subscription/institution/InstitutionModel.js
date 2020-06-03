/**
 * Institution Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.subscription.institution').factory(
  /* Name */
  'InstitutionModel',

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
            'contentaccess/subscription/institution/register/register.html',
          thankyou:
            'contentaccess/subscription/institution/thankyou/thankyou.html',
        },
      }
    },
  ]
)
