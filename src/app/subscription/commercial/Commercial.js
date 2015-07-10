/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.subscription.commercial',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	    'platform-ui.subscription.commercial.register',
	])
	.config(
		function ($stateProvider) {
			/*$stateProvider.state('subscription', {
				url: '/subscription',
				views: {
					'main': {
						controller: 'SubscriptionController',
						templateUrl: 'subscription/subscription.html'
					}
				}
			});*/
		});

