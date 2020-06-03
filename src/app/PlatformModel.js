/**
 * App Model
 */

angular.module('platform-ui').factory(
  /* Name */
  'PlatformModel',

  /* Dependencies */
  [
    /* Controller */
    function () {
      return {
        title: 'PW2 Angular App',
        brand: 'Platform UI',
        author: 'Getexp',
        uiDomain: '.arabidopsis.org', // TODO: YM: 2015-11-19: This attribute appears to be used for cookie domains. CAUTION: Cookies will be set, de facto, for both production and test instances.
      }
    },
  ]
)
