/**forgot pwd Controller
 */

angular
  .module('platform-ui.adminportal.login.forgotpassword.thankyou')
  .controller(
    /* Name */
    'ForgotpwdTyController',

    /* Dependencies */
    [
      '$scope',
      '$http',
      '$cookies',
      '$location',
      '$state',
      'Title',
      'ForgotpwdTyModel',

      /* Controller Definition */
      function (
        $scope,
        $http,
        $cookies,
        $location,
        $state,
        Title,
        ForgotpwdTyModel
      ) {
        $scope.username = $location.search()['username']
        $scope.back = function () {
          $state.go('ltlogin.page')
        }
      },
    ]
  )
