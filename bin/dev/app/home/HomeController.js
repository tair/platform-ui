angular.module('boilerplate.home').controller('HomeController', [
  '$scope',
  'Title',
  'HomeModel',
  function ($scope, Title, HomeModel) {
    Title.setTitle(HomeModel.title);
  }
]);