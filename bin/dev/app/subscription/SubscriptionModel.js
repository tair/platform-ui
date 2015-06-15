angular.module('boilerplate.subscription').factory('SubscriptionModel', [function () {
    return {
      title: 'Subscription',
      license: 'def',
      currentTab: 'chooseTab',
      licenses: {
        individual: {
          id: 'individual',
          heading: 'Individual benefits',
          benefits: [
            { text: 'Who should choose this' },
            { text: 'What they get' }
          ]
        },
        institution: {
          id: 'institution',
          heading: 'Institutional Benefits',
          benefits: [
            { text: 'Who should choose this' },
            { text: 'What they get' }
          ]
        },
        commercial: {
          id: 'commercial',
          heading: 'Commercial Benefits',
          benefits: [
            { text: 'Who should choose this' },
            { text: 'What they get' }
          ]
        },
        def: {
          id: 'default',
          heading: 'Subscription Benefits',
          benefits: [
            { text: 'Unlimited Access to the TAIR pages' },
            { text: 'More wonderful benefits and features' },
            { text: 'Some other option' }
          ]
        }
      },
      tabs: {
        tab1: {
          id: 'chooseTab',
          text: 'Choose License'
        },
        tab2: {
          id: 'infoTab',
          text: 'Your Info'
        },
        tab3: {
          id: 'paymentConfirmationTab',
          text: 'Payment/Confirmation'
        }
      },
      templates: {
        chooseTab: 'subscription/choose/choose.html',
        infoTab: {
          individual: 'subscription/info/individual/individualInfo.html',
          institution: 'subscription/info/institution/institutionInfo.html',
          commercial: 'subscription/info/commercial/commercialInfo.html'
        },
        paymentConfirmationTab: {
          individual: 'subscription/paymentConfirmation/individual/individualPay.html',
          institution: 'subscription/paymentConfirmation/institution/institutionPay.html',
          commercial: 'subscription/paymentConfirmation/commercial/commercialPay.html'
        }
      }
    };
  }]);