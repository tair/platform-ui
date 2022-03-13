/**
 * App Module
 */

angular
  .module(
    /* Name of our app module */
    'platform-ui',

    /* Dependencies */
    [
      /* Templates */
      'templates-app',

      /* UI */
      'ui.bootstrap',
      'ui.router',

      /* Angular */
      'ngResource',
      'ngRoute',
      'ngCookies',

      /* Misc */
      'service.title',
      'service.ipv6',
      'autocomplete',
      'autocompletecountries',

      /* App-specific */
      'platform-ui.home',
      'platform-ui.contentaccess',
      'platform-ui.adminportal',
    ]
  )
  .service(

  )
  .config(function ($routeProvider, $httpProvider, $urlRouterProvider) {
    /**
     * Delete the X-Requested-With default header to allow cross-origin requests.
     */
    delete $httpProvider.defaults.headers.common['X-Requested-With']

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded;charset=utf-8'

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [
      function (data) {
        return angular.isObject(data) && String(data) !== '[object File]'
          ? jQuery.param(data)
          : data
      },
    ]

    $httpProvider.defaults.withCredentials = true

    $httpProvider.defaults.xsrfCookieName = 'csrftoken'
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'

    /**
     * Routing
     */
    $urlRouterProvider
      /* Default */
      .otherwise(
        '/contentaccess/subscription?partnerId=tair&redirect=https:%2F%2Fwww.arabidopsis.org'
      )
  })
  .run(function ($rootScope, $http, Title, PlatformModel) {
    // Load server-specific configurable parameters.
    //
    // PW-186: YM: 2015-11-19: HACK: A synchronous HTTP request is considered to be a "bad practice".
    // However, in this particular case we cannot afford any refactoring
    // and this "bad practice" appears to be the most practical solution I could come up with.
    //
    // P.S. Not sure this is the best place to make this synchronous call. Perhaps it should be in the .run() of some other module.
    //
    // P.P.S. Some "good practice" solutions are nicely summarized in this discussion:
    // http://stackoverflow.com/questions/27050496/run-controllers-only-after-initialization-is-complete-in-angularjs/27050497#27050497
    jQuery.ajax({
      url: '/config/config.json',
      async: false,
      cache: false, // PW-256: This is the simplest fix for the cases when the server returns HTTP 304 code and blank payload.
      success: function (data) {
        config = data[0]
        $rootScope.apiUri = config.paywallApiBaseUri
        $rootScope.stripePublishableKey = config.stripePublishableKey
      },
    })

    // CSRF ceremonies
    //
    $http({
      url: $rootScope.apiUri + '/cookies/get/',
      method: 'GET',
    })
      .success(function (data, status, headers, config) {
        document.cookie =
          'csrftoken=' +
          data['csrftoken'] +
          ';domain=' +
          PlatformModel.uiDomain +
          ';path=/'
        $http.defaults.headers.post['X-CSRFToken'] = data['csrftoken']
      })
      .error(function () {
        alert('Cannot access API server')
      })

    //
    Title.setSuffix(' | ' + PlatformModel.brand)
    //autoscroll top
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    })
  })
