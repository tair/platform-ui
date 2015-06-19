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
	'platform-ui.subscription.info.individual',
	'platform-ui.subscription.info.institution',
	'platform-ui.subscription.info.commercial',
	'platform-ui.subscription.paymentConfirmation.individual'
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

