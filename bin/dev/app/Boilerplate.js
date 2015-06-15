angular.module('boilerplate', [
  'templates-app',
  'ui.bootstrap',
  'ui.router',
  'ngResource',
  'ngRoute',
  'service.title',
  'boilerplate.home',
  'boilerplate.metering',
  'boilerplate.subscription'
]).config([
  '$routeProvider',
  '$httpProvider',
  '$urlRouterProvider',
  function ($routeProvider, $httpProvider, $urlRouterProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data;
      }];
    $urlRouterProvider.otherwise('/home');
  }
]).run([
  '$rootScope',
  'Title',
  'BoilerplateModel',
  function ($rootScope, Title, BoilerplateModel) {
    Title.setSuffix(' | ' + BoilerplateModel.brand);
  }
]);