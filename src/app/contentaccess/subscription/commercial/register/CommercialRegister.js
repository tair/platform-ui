/**
 * Subscription Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription.commercial.register',

    /* Dependencies */
    ['ui.router', 'service.title', 'customerrmsg']
  )
  .config(function ($stateProvider) {
    /*$stateProvider.state('subscription', {
				url: '/subscription',
				views: {
					'main': {
						controller: 'SubscriptionController',
						templateUrl: 'subscription/subscription.html'
					}
				}
			});*/
  })
