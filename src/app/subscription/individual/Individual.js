/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.subscription.individual',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	    'platform-ui.subscription.individual.term',
	    'platform-ui.subscription.individual.pay',
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

