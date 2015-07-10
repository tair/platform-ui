/**
 * Activation Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.activation',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('activation', {
				url: '/activation',
				views: {
					'main': {
						controller: 'ActivationController',
						templateUrl: 'activation/activation.html'
					}
				}
			});
		});

