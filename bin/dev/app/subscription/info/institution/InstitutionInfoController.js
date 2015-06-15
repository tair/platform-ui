angular.module('boilerplate.subscription.info.institution').controller('InstitutionInfoController', [
  '$scope',
  '$rootScope',
  'InstitutionInfoModel',
  function ($scope, $rootScope, InstitutionInfoModel) {
    init();
    $scope.resetInstitutionForm = function () {
      $scope.formdata = {
        firstname: '',
        lastname: '',
        email: '',
        institution: '',
        librarianName: '',
        librarianEmail: '',
        comments: ''
      };
    };
    function init() {
      $scope.formdata = InstitutionInfoModel.formdata;
    }
  }
]);