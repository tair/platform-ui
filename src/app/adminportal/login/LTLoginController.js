/**
 * Login Controller
 */

angular.module('platform-ui.adminportal.login').controller(
  /* Name */
  'LTLoginController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$location',
    '$state',
    'Title',
    'LTLoginModel',

    /* Controller Definition */
    function ($scope, $http, $cookies, $location, $state, Title, LTLoginModel) {
      $state.go('ltlogin.page')
    },
  ]
)
