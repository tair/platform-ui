/**
 * Login Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.login',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.login.forgetusername',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('login.form', {
        url: '?{partnerId}&{redirect}',
        views: {
          login: {
            templateUrl: 'contentaccess/login/form/form.html',
          },
        },
      })
      .state('login.success', {
        url: '/success?{partnerId}&{redirect}',
        views: {
          login: {
            templateUrl: 'contentaccess/login/success/success.html',
          },
        },
      })
      .state('login.forgetusername', {
        abstract: true,
        url: '/forgetusername?{partnerId}&{redirect}',
        views: {
          login: {
            controller: 'ForgetUsernameController',
            templateUrl:
              'contentaccess/login/forgetusername/forgetusername.html',
          },
        },
      })
  })
