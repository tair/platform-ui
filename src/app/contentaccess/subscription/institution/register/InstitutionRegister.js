/**
 * Register Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription.institution.register',

    /* Dependencies */
    ['ui.router', 'service.title']
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
