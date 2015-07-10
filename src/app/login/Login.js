/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.login',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('login', {
				url: '/login',
				views: {
					'main': {
						controller: 'LoginController',
						templateUrl: 'login/login.html'
					}
				}
			});
		});

