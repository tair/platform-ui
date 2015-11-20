/**
 * App Module
 */

angular.module(
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
	'autocomplete',
	    'autocompletecountries',

	/* App-specific */
	'platform-ui.home',
	'platform-ui.contentaccess',
	'platform-ui.librariantool',
	])
	.config(
		function ($routeProvider, $httpProvider, $urlRouterProvider) {
			/**
			 * Delete the X-Requested-With default header to allow cross-origin requests.
			 */
			delete $httpProvider.defaults.headers.common["X-Requested-With"];

			// Use x-www-form-urlencoded Content-Type
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

			// Override $http service's default transformRequest
			$httpProvider.defaults.transformRequest = [function(data)
			{
				return angular.isObject(data) && String(data) !== '[object File]' ? jQuery.param(data) : data;
			}];			

		        $httpProvider.defaults.withCredentials = true;

			$httpProvider.defaults.xsrfCookieName = 'csrftoken';
			$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

			/**
			 * Routing
			 */
			$urlRouterProvider
				/* Default */
				.otherwise('/contentaccess/subscription?partnerId=tair&redirect=https:%2F%2Fdemotair.arabidopsis.org');
		})
	.run(
		function ($rootScope, $http, Title, PlatformModel) {
			
	        console.log('DEBUG PW-186: Platform::run()');
	        
	        // PW-186: YM: 2015-11-19: HACK: A synchronous HTTP request is considered to be a "bad practice". 
	        // However, in this particular case we cannot afford any refactoring 
	        // and this "bad practice" appears to be the most practical solution I could come up with.
	        jQuery.ajax({ 
	            url: '/config/config.json', 
	            async: false,
	            success: function(data) {
	                config = data[0];
	                console.log( "DEBUG PW-186: Paywall API base URI: " + config.paywallApiBaseUri);
	                $rootScope.apiUri = config.paywallApiBaseUri;
	                $rootScope.stripePublishableKey = config.stripePublishableKey;
	            }
	        });

	        $http({
				url: $rootScope.apiUri + '/cookies/get/',
				method: 'GET'
			}).success(function(data, status, headers, config) {
				document.cookie='csrftoken='+data['csrftoken']+';domain='+PlatformModel.uiDomain+';path=/';
				$http.defaults.headers.post['X-CSRFToken'] = data['csrftoken'];
			}).error(function() {
				alert("Unable to get CSRF cookie");
			});

			Title.setSuffix(' | ' + PlatformModel.brand);
		});
