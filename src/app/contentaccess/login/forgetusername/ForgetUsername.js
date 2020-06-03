/**
 * Login Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.login.forgetusername',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.login.forgetusername.thankyou',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('login.forgetusername.sendlink', {
        url: '',
        views: {
          forgetusername: {
            controller: 'ForgetUsernameController',
            templateUrl:
              'contentaccess/login/forgetusername/sendlink/sendlink.html',
          },
        },
      })
      .state('login.forgetusername.thankyou', {
        url: '/thankyou?email',
        views: {
          forgetusername: {
            controller: 'ForgetUsernameTyController',
            templateUrl:
              'contentaccess/login/forgetusername/thankyou/thankyou.html',
          },
        },
      })
  })
