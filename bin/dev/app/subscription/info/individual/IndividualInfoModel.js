angular.module('boilerplate.subscription.info.individual').factory('IndividualInfoModel', [function () {
    return {
      formdata: {
        firstname: '',
        lastname: '',
        email: '',
        individual: '',
        librarianName: '',
        librarianEmail: '',
        comments: ''
      }
    };
  }]);