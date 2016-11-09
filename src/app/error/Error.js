/**
 * Error Module
 
 file:///C:/Users/avetushko/git/platform-ui/bin/dev/index.html#/error?error=MMM&partnerId=tair
 https://demoui.arabidopsis.org/#/error?error=YYY&parterId=tair
 
 * Error page
 */

angular.module(
	/* Name */
	'platform-ui.error',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('error', {
				url: '/error',
				views: {
					'main': {
						controller: 'ErrorController',
						templateUrl: 'error/error.html'
					}
				}
			});
		});

