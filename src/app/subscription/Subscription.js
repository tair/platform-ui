/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.subscription',

	/* Dependencies */
	[
	'ui.router',
	'service.title',

	    'platform-ui.subscription.landing',
	    'platform-ui.subscription.individual',
	    'platform-ui.subscription.commercial',
	    'platform-ui.subscription.institution',
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('subscription', {
				url: '/subscription',
				views: {
					'main': {
						controller: 'SubscriptionController',
						templateUrl: 'subscription/subscription.html'
					}
				}
			});
		});

