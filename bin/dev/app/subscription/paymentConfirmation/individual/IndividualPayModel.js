angular.module('boilerplate.subscription.paymentConfirmation.individual').factory('IndividualPayModel', [function () {
    return {
      formdata: {
        firstname: '',
        lastname: '',
        email: '',
        institution: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        creditcard: '',
        expdate: '',
        cvc: ''
      }
    };
  }]);