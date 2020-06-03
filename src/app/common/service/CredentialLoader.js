/**
 * Title Service
 *
 * load credential from $cookies or $window.sessionStorage
 */

angular.module('service.credentialloader', []).service(
  /* Name */
  'CredentialLoader',

  /* Dependencies */
  [
    '$cookies',
    '$window',

    function ($cookies, $window) {
      this.loadCredential = function () {
        if ($cookies.credentialId != null) {
          $scope.credentialId = $cookies.credentialId
        } else if ($window.sessionStorage.credentialId != null) {
          $scope.credentialId = $window.sessionStorage.credentialId
        }
        if ($cookies.secretKey != null) {
          $scope.secretKey = $cookies.secretKey
        } else if ($window.sessionStorage.secretKey != null) {
          $scope.secretKey = $window.sessionStorage.secretKey
        }
      }
    },
  ]
)
