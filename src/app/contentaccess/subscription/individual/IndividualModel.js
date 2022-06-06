/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.subscription.individual').factory(
  /* Name */
  'IndividualModel',

  /* Dependencies */
  [
    function () {
      return {
        formdata: {
          firstname: null,
          lastname: null,
          email: null,
          emailConfirm: null,
          institution: null,
          street: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          creditcard: null,
          expmonth: null,
          expyear: null,
          cvc: null,
          other: null, //PW-248
        },
        info: {
          numOfSubscribers: 1,
          subtotal: null,
        },
        selectedSubscription: {
          subscriptionTermId: null,
          partnerId: null,
          period: null,
          price: null,
          groupDiscountPercentage: null,
        },
        currentTab: 'term',
        tabs: {
          notused: {
            id: 'not used',
            text: '1. Choose License',
          },
          tab1: {
            id: 'term',
            text: '2. Choose Term',
          },
          tab2: {
            id: 'pay',
            text: '3. Info/Payment',
          },
          tab3: {
            id: 'confirm',
            text: '4. Confirmation',
          },
        },
        templates: {
          term: 'contentaccess/subscription/individual/term/term.html',
          pay: 'contentaccess/subscription/individual/pay/pay.html',
          confirm: 'contentaccess/subscription/individual/confirm/confirm.html',
          thankyou:
            'contentaccess/subscription/individual/thankyou/thankyou.html',
        },
      }
    },
  ]
)
