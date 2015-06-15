/**
 * App Module
 */

angular.module(
	/* Name of our app module */
	'boilerplate',

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

	/* Misc */
	'service.title',

	/* App-specific */
	'boilerplate.home',
	'boilerplate.metering',
	'boilerplate.subscription',
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

			/**
			 * Routing
			 */
			$urlRouterProvider
				/* Default */
				.otherwise('/home');
		})
	.run(
		function ($rootScope, Title, BoilerplateModel) {
			/**
			 * Set title
			 */
			Title.setSuffix(' | ' + BoilerplateModel.brand);
		});
