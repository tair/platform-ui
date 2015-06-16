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
	'boilerplate.subscription.info.individual',
	'boilerplate.subscription.info.institution'
	//'boilerplate.subscription.info.commercial'
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

