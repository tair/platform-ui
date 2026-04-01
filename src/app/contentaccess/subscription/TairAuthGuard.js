/**
 * Shared auth guard for TAIR individual subscription pages.
 * Redirects unauthenticated TAIR users to the login page.
 */
angular
  .module('platform-ui.contentaccess.subscription')
  .factory('TairAuthGuard', ['$cookies', '$state', function ($cookies, $state) {
    return {
      /**
       * Check if a TAIR user needs to log in.
       * Returns true if redirected to login (caller should return early).
       */
      requireLogin: function (partnerId, orcidId, redirect) {
        var isTair = partnerId && partnerId.toLowerCase() === 'tair';
        if (isTair && !$cookies.credentialId && !orcidId) {
          var returnUrl = '/contentaccess/subscription/individual?partnerId=' + partnerId;
          if (redirect) {
            returnUrl += '&redirect=' + encodeURIComponent(redirect);
          }
          $state.go('login.form', {
            partnerId: partnerId,
            redirect: redirect,
            returnTo: returnUrl,
          });
          return true;
        }
        return false;
      }
    };
  }]);
