angular.module('boilerplate.subscription.info.individual').controller('IndividualInfoController', [
  '$scope',
  '$rootScope',
  'IndividualInfoModel',
  function ($scope, $rootScope, IndividualInfoModel) {
    init();
    $scope.resetIndividualForm = function () {
      $scope.formdata = {
        firstname: '',
        lastname: '',
        email: '',
        individual: '',
        librarianName: '',
        librarianEmail: '',
        comments: ''
      };
    };
    function init() {
      $scope.formdata = IndividualInfoModel.formdata;
    }
  }
]);