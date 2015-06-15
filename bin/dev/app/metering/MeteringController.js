angular.module('boilerplate.metering').controller('MeteringController', [
  '$scope',
  'Title',
  'MeteringModel',
  function ($scope, Title, MeteringModel) {
    Title.setTitle(MeteringModel.title);
  }
]);