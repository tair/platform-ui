/**
 * Home Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'boilerplate.home',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('home', {
				url: '/home',
				views: {
					'main': {
						controller: 'HomeController',
						templateUrl: 'home/home.html'
					}
				}
			});
		});

