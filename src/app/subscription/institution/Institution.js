/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.subscription.institution',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	    'platform-ui.subscription.institution.register',
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

