/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.login.page').factory(
  /* Name */
  'LTLoginPageModel',

  /* Dependencies */
  [
    function () {
      return {
        title: 'Login',

        formdata: {
          user: null,
          password: null,
        },
      }
    },
  ]
)
