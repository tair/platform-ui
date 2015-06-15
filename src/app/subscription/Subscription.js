/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'boilerplate.subscription',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	'boilerplate.subscription.info.institution'
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

