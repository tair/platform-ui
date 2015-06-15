angular.module('boilerplate').controller('BoilerplateController', [
  '$scope',
  'BoilerplateModel',
  function ($scope, BoilerplateModel) {
    $scope.title = BoilerplateModel.title;
    $scope.brand = BoilerplateModel.brand;
    $scope.author = BoilerplateModel.author;
    $scope.menu = BoilerplateModel.menu;
  }
]);