angular.module('boilerplate.subscription.info.institution').factory('InstitutionInfoModel', [function () {
    return {
      formdata: {
        firstname: '',
        lastname: '',
        email: '',
        institution: '',
        librarianName: '',
        librarianEmail: '',
        comments: ''
      }
    };
  }]);