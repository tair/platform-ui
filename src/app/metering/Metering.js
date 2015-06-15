/**
 * Metering Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'boilerplate.metering',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('metering', {
				url: '/metering',
				views: {
					'main': {
						controller: 'MeteringController',
						templateUrl: 'metering/metering.html'
					}
				}
			});
		});

